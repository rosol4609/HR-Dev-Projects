"""Create User table with email and phone number

Revision ID: 12dcd7ed04bb
Revises: 
Create Date: 2024-10-04 14:46:51.842447

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12dcd7ed04bb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=150), nullable=False),
    sa.Column('surname', sa.String(length=150), nullable=False),
    sa.Column('username', sa.String(length=150), nullable=False),
    sa.Column('email', sa.String(length=150), nullable=False),
    sa.Column('phone_number', sa.String(length=20), nullable=False),
    sa.Column('password', sa.String(length=150), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###