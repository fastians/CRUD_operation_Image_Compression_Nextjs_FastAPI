from fastapi import FastAPI, status,Request
from tortoise.contrib.fastapi import register_tortoise
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import Pickyimage
from fastapi import  FastAPI, File, UploadFile
from PIL import Image
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from datetime import datetime
import io
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

origins = ["http://localhost:3000","*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
register_tortoise(
    app,
    db_url='sqlite://db.sqlite3',
    modules={'models': ['main']},
    generate_schemas=True,
    add_exception_handlers=True
)


@app.post('/api/v1/compressimage')
async def receiveFile(file: UploadFile = File(...)):
    content = await file.read()  
    image = Image.open(io.BytesIO(content))
    image.save('static/tmp_'+file.filename,optimize=True, quality=95)
    return FileResponse('static/tmp_'+file.filename)

@app.post('/api/v1/add-pickyimage/')
async def receiveFile(file: UploadFile = File(...)):
    now = datetime.now()
    content = await file.read()  
    image = Image.open(io.BytesIO(content))
    # image.show()
    file.filename = now.strftime("%d%m%Y%H%M%S_")+file.filename
    image.save('static/'+file.filename,optimize=True, quality=95)

    stu_obj = Pickyimage(
        name=file.filename
    )
    await stu_obj.save()
    return {"filename": file.filename}

@app.get('/api/v1/pickyimage-list/')
async def pickyimage_list(request: Request):
    pickyimages = await Pickyimage.all()

    for pickyimage in pickyimages:
        pickyimage.name = request.url_for('static', path=pickyimage.name)
    # return pickyimages
    json_data = jsonable_encoder(pickyimages)
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=json_data
    )


@app.get('/api/v1/pickyimage-details/{id}')
async def pickyimage_details(id: int,request: Request):
    pickyimage = await Pickyimage.get(id=id)
    pickyimage.name = request.url_for('static', path=pickyimage.name)
    json_data = jsonable_encoder(pickyimage)
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=json_data
    )


@app.delete('/api/v1/delete-pickyimage/{id}')
async def delete_pickyimage(id: int):
    pickyimage = await Pickyimage.get(id=id)
    await pickyimage.delete()
    return {'details': "deleted"}

# @app.get('/imgfiles')
# async def pickyimage_list(request: Request):
#     img_url = request.url_for('static', path="myphoto.png")
#     return img_url
#     #return FileResponse(some_file_path)

