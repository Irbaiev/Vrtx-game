import json
import os

# --- КОНФИГУРАЦИЯ ---
HAR_FILE_NAME = "vortex.har"  # Имя вашего HAR файла
OUTPUT_SCRIPT_NAME = "download_assets.ps1" # Имя готового PowerShell скрипта
OUTPUT_FOLDER_NAME = "game_assets" # Название папки, куда будут скачаны файлы
# --------------------

print(f"[*] Начинаю обработку файла: {HAR_FILE_NAME}")

if not os.path.exists(HAR_FILE_NAME):
    print(f"[!] ОШИБКА: Файл {HAR_FILE_NAME} не найден. Убедитесь, что он лежит в той же папке, что и этот скрипт.")
    exit()

try:
    with open(HAR_FILE_NAME, 'r', encoding='utf-8') as f:
        har_data = json.load(f)
except Exception as e:
    print(f"[!] ОШИБКА: Не удалось прочитать HAR файл. {e}")
    exit()

unique_urls = set()
entries = har_data.get('log', {}).get('entries', [])

for entry in entries:
    url = entry.get('request', {}).get('url')
    # Пропускаем data: URI, так как их нельзя скачать напрямую
    if url and not url.startswith('data:'):
        unique_urls.add(url)

if not unique_urls:
    print("[!] В HAR файле не найдено ни одного URL. Попробуйте экспортировать его еще раз.")
    exit()

print(f"[*] Найдено {len(unique_urls)} уникальных URL-адресов.")

# Создаем PowerShell скрипт
with open(OUTPUT_SCRIPT_NAME, 'w', encoding='utf-8') as f:
    f.write(f'# Создано автоматически из {HAR_FILE_NAME}\n\n')
    f.write(f'New-Item -ItemType Directory -Force -Path ".\\{OUTPUT_FOLDER_NAME}"\n\n')
    
    for url in sorted(list(unique_urls)): # Сортируем для порядка
        try:
            # Извлекаем чистое имя файла из URL
            file_name = url.split('/')[-1].split('?')[0]
            if not file_name:
                continue # Пропускаем пустые имена

            # Формируем команду
            command = f'Invoke-WebRequest -Uri "{url}" -OutFile ".\\{OUTPUT_FOLDER_NAME}\\{file_name}"\n'
            f.write(command)
        except Exception:
            # Пропускаем проблемные URL
            continue

print(f"[+] Успешно! Создан PowerShell скрипт: {OUTPUT_SCRIPT_NAME}")
print(f"[*] Теперь просто запустите его в терминале PowerShell, чтобы скачать все файлы.")