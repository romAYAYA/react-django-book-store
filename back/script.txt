# виртуальное окружение
python -m venv venv

# входит в env
call venv/scripts/activate

# установить библиотеки
pip install -r requirements.txt

# запускаем сервер
python manage.py runserver 0.0.0.0:8000