FROM node:current-alpine

RUN mkdir -p /static
RUN mkdir -p /code

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./ /code/

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]