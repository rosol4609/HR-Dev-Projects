import numpy as np
from tqdm import tqdm
import matplotlib.pyplot as plt
import sys

img_tech = plt.imread(r"images/rysunek_techniczny.jpg")
img_wzor = plt.imread(r"images/wzor_dokumentu.png")
img_color = plt.imread(r"images/kolorowe_zdjecie.jpg")
#img_google = plt.imread(r"google_picture.jpg")
paths = [img_tech, img_wzor, img_color]
print(img_tech.shape)

def get_size(obj, seen=None):
    size = sys.getsizeof(obj)
    if seen is None:
        seen = set()
    obj_id  = id(obj)
    if obj_id is seen:
        return 0
    seen.add(obj_id)
    if isinstance(obj,np.ndarray):
        size=obj.nbytes
    elif isinstance(obj, dict):
        size += sum([get_size(v, seen) for v in obj.values()])
        size += sum([get_size(k, seen) for k in obj.keys()])
    elif hasattr(obj, '__dict__'):
        size += get_size(obj.__dict__, seen)
    elif hasattr(obj, '__iter__') and not isinstance(obj, (str, bytes, bytearray)):
        size += sum([get_size(i, seen) for i in obj])
    return size
dane_testowe = np.array([1,1,1,1,2,1,1,1,1,2,1,1,1,1])
print(dane_testowe)
print(np.array(dane_testowe.shape))
print(get_size(dane_testowe))

def test_RLE_encode(data):
    flat_data = data.flatten()
    buffer_size = len(flat_data) * 2
    encoded_buffer = np.zeros(buffer_size, dtype=int)
    start_value = flat_data[0]
    start_length = 1
    buffer_index = 0
    for i in range(1, len(flat_data)):
        if flat_data[i] == start_value:
            start_length += 1
        else:
            encoded_buffer[buffer_index] = start_length
            encoded_buffer[buffer_index + 1] = start_value
            buffer_index += 2
            start_value = flat_data[i]
            start_length = 1
    encoded_buffer[buffer_index] = start_length
    encoded_buffer[buffer_index + 1] = start_value
    buffer_index += 2
    encoded_data = encoded_buffer[:buffer_index]
    original_shape = np.array(data.shape)
    encoded_combined_data = np.concatenate(([original_shape.size], original_shape, encoded_data))
    return encoded_combined_data
dane_testowe1 = np.array([-1,-1,-1,-5,-5,-3,-4,-2,1,2,2,1])
dane_testowe2 = np.eye(7)
encoded_data = test_RLE_encode(dane_testowe1)
print(dane_testowe1)
print(get_size(dane_testowe1))
print("RLE encode: ", encoded_data)
print(get_size(encoded_data))
#print("Oryginal shape", original_shape)

def test_RLE_decode(encoded_data):
    num_dims = encoded_data[0]
    original_shape = tuple(encoded_data[1:num_dims+1])
    encoded_data = encoded_data[num_dims+1:]
    decoded_list = []
    i = 0
    while i < len(encoded_data):
        start_length = encoded_data[i]
        start_value = encoded_data[i + 1]
        decoded_list.extend([start_value] * start_length)
        i += 2
    decoded_array = np.array(decoded_list).reshape(original_shape)
    return decoded_array
#enc = compress_data_with_shape_info(dane_testowe1)
decode = test_RLE_decode(encoded_data)
print("RLE decode: ", decode)

def handle_repeats(data, index):
    start_value = data[index]
    count = 1
    max_index = len(data)
    while index + count < max_index and data[index + count] == start_value and count < 128:
        count += 1
    return count, start_value

def handle_non_repeats(data, index):
    start_index = index
    max_index = len(data)
    while index + 1 < max_index and data[index] != data[index + 1] and (index - start_index) < 127:
        index += 1
    if index + 1 < max_index and data[index] == data[index + 1]:
        return index - start_index, data[start_index:index]
    else:
        return index - start_index + 1, data[start_index:index + 1]


def Byterun_encode(data):
    flattened_data = data.flatten()
    encoded = []
    encoded.append(len(data.shape))
    encoded.extend(data.shape)
    i = 0
    max_steps = len(flattened_data)
    
    with tqdm(total=max_steps) as pbar:
        while i < len(flattened_data):
            if i + 1 < len(flattened_data) and flattened_data[i] == flattened_data[i + 1]:
                count, value = handle_repeats(flattened_data, i)
                encoded.append(-count + 1)
                encoded.append(value)
                i += count
            else:
                count, elements = handle_non_repeats(flattened_data, i)
                encoded.append(count - 1)
                encoded.extend(elements)
                i += count
            pbar.update(count)

    return np.array(encoded, dtype=int)

def Byterun_decode(encoded_data):
    num_dims = encoded_data[0]
    original_shape = tuple(encoded_data[1:num_dims+1])
    decoded_data = []
    i = num_dims + 1
    max_steps = np.prod(original_shape)
    
    with tqdm(total=max_steps) as pbar:
        while i < len(encoded_data):
            count = encoded_data[i]
            if count < 0:
                value = encoded_data[i + 1]
                repeat_count = (-count + 1)
                decoded_data.extend([value] * (-count + 1))
                i += 2
            else:
                count += 1
                decoded_data.extend(encoded_data[i + 1: i + 1 + count])
                i += count + 1
            pbar.update(repeat_count if count < 0 else count)

    return np.array(decoded_data).reshape(original_shape)

#original_data = np.array([5,5,5,1,2,3,4,4,1,2,3,4])
#original_data = np.array([-1,-1,-1,-5,-5,-3,-4,-2,1,2,2,1])
original_data = img_wzor
original_data = original_data.astype(int)
encoded_data_b = Byterun_encode(original_data)
#decoded_data = Byterun_decode(encoded_data_b)
print("Original Data:", original_data)
print("Original Data size (using get_size):", get_size(original_data))
print("Original Data size (using sys.getsizeof):", sys.getsizeof(original_data))
print("Original Data size (using nbytes):", original_data.nbytes)
print("Encoded Data:", encoded_data_b)
print("Encoded Data size (using get_size):", get_size(encoded_data_b))
print("Encoded Data size (using sys.getsizeof):", sys.getsizeof(encoded_data_b))
print("Encoded Data size (using nbytes):", encoded_data_b.nbytes)
try:
    decoded_data = Byterun_decode(encoded_data_b)
    print("Decoded Data:", decoded_data)
    print("Decoded Data size: ", get_size(decoded_data))
except Exception as e:
    print(str(e))

t1 = np.array([5,1,5,1,5,5,1,1,5,5,1,1,5])
t2 = np.dstack([np.eye(7),np.eye(7),np.eye(7)])
t3 = np.eye(7)
tests = [t1, t2, t3]
print("RLE:")
def RLE_test(tests):
    for x, i in enumerate(tests):
        i = i.astype(int)
        print("Original_data: ", i)
        print(f"Original_size: {i.nbytes}")
        compress = test_RLE_encode(i)
        print(f"encode_test_{x+1}:",compress)
        print(f"Size_encode: {compress.nbytes}")
        decompress = test_RLE_decode(compress)
        print(f"decode_test_{x+1}:",decompress)
        print(f"Size_decode: {decompress.nbytes}")
RLE_test(tests)
print("ByteRun:")
def Byterun_test(tests):
    for x, i in enumerate(tests):
        i = i.astype(int)
        print("Original_data: ", i)
        print(f"Original_size: {i.nbytes}")
        compress = Byterun_encode(i)
        print(f"encode_test_{x+1}:",compress)
        print(f"Size_encode: {compress.nbytes}")
        decompress = Byterun_decode(compress)
        print(f"decode_test_{x+1}:",decompress)
        print(f"Size_decode: {decompress.nbytes}")
Byterun_test(tests)
def CR(size_before, size_after):
    return size_before / size_after

def PR(size_before, size_after):
    return (size_after / size_before) * 100
def compression_test(img, encode_function, decode_function):
    original_size = img.nbytes
    encoded = encode_function(img)
    decoded = decode_function(encoded)
    encoded_size = encoded.nbytes
    if np.array_equal(img, decoded):
        print("Identyczne dane.")
    else:
        print("Nie identyczne dane.")
    cr = CR(original_size, encoded_size)
    pr = PR(original_size, encoded_size)
    return original_size, encoded_size, cr, pr
def main():
    images = [img_tech, img_wzor, img_color]
    titles = ['Rysunek techniczny', 'Wzor dokumentu', 'Kolorowe zdjęcie']
    results = []
    for img, tit in zip(images, titles):
        img = img.astype(int)
        print(f"Obraz: {tit}, Rozmiar oryginalny: {img.nbytes} bajtów")
        print("Test RLE:")
        rle_results = compression_test(img, test_RLE_encode, test_RLE_decode)
        results.append(('RLE', rle_results))
        print(f"Rozmiar zakodowany: {rle_results[1]} bajtów, CR: {rle_results[2]}, PR: {rle_results[3]}%")
        print("Test Byterun:")
        byterun_results = compression_test(img, Byterun_encode, Byterun_decode)
        results.append(('Byterun', byterun_results))
        print(f"Rozmiar zakodowany: {byterun_results[1]} bajtów, CR: {byterun_results[2]}, PR: {byterun_results[3]}%")
    return results

if __name__ == "__main__":
    main_results = main()