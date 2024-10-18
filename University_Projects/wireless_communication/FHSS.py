import numpy as np
import matplotlib.pyplot as plt

dt = [1, 0, 0, 1]
Nc1 = 32

def LFSR(bits, seeds, Nc):
    copy_bit = bits.copy()
    output_matrix = []
    output_vector = []

    for i in range(Nc):
        xor = 0
        for seed in seeds:
            xor ^= copy_bit[seed - 1]

        copy_bit = [xor] + bits
        bits = copy_bit
        length = int(len(bits) - i)
        output_row = copy_bit[:length]
        output_matrix.append(output_row)

    for row in output_matrix:
        print(row[1:])
    print("\n")
    for row in output_matrix:
        output_vector.append(row[-1])
    return output_vector

l1_bits = [0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0]
l1_seeds = [2, 11]

l2_bits = [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1]
l2_seeds = [2, 5, 8, 11]

vector_l1 = LFSR(l1_bits, l1_seeds, Nc1)
vector_l2 = LFSR(l2_bits, l2_seeds, Nc1)
#print(vector_l1)
#print(vector_l2)

kod_golda = []
for i in range(Nc1):
    out_xor = vector_l1[i] ^ vector_l2[i]
    kod_golda.append((out_xor))
print("G =", kod_golda)
print(len(kod_golda))

bit_FSK = kod_golda
FSK = len(bit_FSK)
Tc = 1
fs = 1024
Tb_FSK = Tc / FSK
W_FSK = 2
N = int(Tb_FSK * fs)

def FSK(bit_stream, Tb, W):
    zF = []
    for bit in bit_stream:
        for n in range(N):
            t = n / fs
            fn1 = (W + 1)/Tb
            fn2 = (W + 2)/Tb
            if bit == 0:
                zF1 = np.sin(2 * np.pi * fn1 * t)
                zF.append(zF1)
            elif bit == 1:
                zF2 = np.sin(2 * np.pi * fn2 * t)
                zF.append(zF2)
    return zF

zF_FSK = FSK(bit_FSK, Tb_FSK, W_FSK)
t_FSK = [n / fs for n in range(len(bit_FSK) * N)]
plt.figure(figsize=(10, 5))
plt.plot(t_FSK, zF_FSK)
plt.title("Modulacja FSK")
plt.xlabel("Czas [s]")
plt.ylabel("Amplituda")
plt.grid(True)
plt.show()

fs_values = {
    '0000':100,
    '0001':200,
    '0010':300,
    '0011':400,
    '0100':500,
    '0101':600,
    '0110':700,
    '0111':800,
    '1000':900,
    '1001':1000,
    '1010':1100,
    '1011':1200,
    '1100':1300,
    '1101':1400,
    '1110':1500,
    '1111':1600
}

def bits_to_string(bit_stream):
    return ''.join(str(bit) for bit in bit_stream)
string_bits = bits_to_string(bit_FSK)
print(string_bits)
def FHSS(bit_stream, Tb, fs):
    zF = []
    N = int(Tb * fs)
    for i in range(0, len(bit_stream), 4):
        bit_pair = bit_stream[i:i+4]
        if len(bit_pair) < 4:
            continue
        change_fs = fs_values.get(bit_pair)
        for n in range(N):
            t = n / fs
            zF.append(np.sin(2 * np.pi * change_fs * t))
    return zF

Tb2 = 0.01
fs2 = 8000

zF_FHSS = FHSS(string_bits, Tb2, fs2)
t_FHSS = [n / fs for n in range(len(zF_FHSS))]

plt.figure(figsize=(10, 5))
plt.plot(t_FHSS, zF_FHSS)
plt.title("Modulacja FHSS")
plt.xlabel("Czas [s]")
plt.ylabel("Amplituda")
plt.grid(True)
plt.show()

z = FHSS(string_bits, Tb2, fs2)
t_FHSS = [n / fs for n in range(len(z))]

Z_B = np.fft.rfft(zF_FSK)
N_w = len(Z_B)
k = np.arange(N)
fk = k * (fs2 / N_w)
M = np.sqrt(np.real(Z_B[:N])**2 + np.imag(Z_B[:N])**2)
db_Scale = 10 * np.log10(M)
plt.plot(fk, db_Scale)
plt.title("Widmo sygnału FSK")
plt.xlabel("Częstotliwość [Hz]")
plt.ylabel("Moc [dB]")
plt.grid(True)
plt.show()

