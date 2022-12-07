from models import Pickyimage
from tortoise.contrib.pydantic import pydantic_model_creator

PickyimageIn_Pydantic = pydantic_model_creator(
    Pickyimage,
    name="PickyimageIn"
)

PickyimageOut_Pydantic = pydantic_model_creator(
    Pickyimage,
    name="PickyimageOut",
    exclude=('id', 'created_at', 'updated_at',)
)
