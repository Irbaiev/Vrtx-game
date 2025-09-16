import os
import shutil
import re
import argparse

def clean_filename(filename):
    """
    Очищает имя файла, удаляя хеши в стиле Webpack и GET-параметры.
    """
    # 1. Удаляем GET-параметры (все после '?')
    base_name_with_ext = filename.split('?')[0]
    
    # 2. Отделяем базовое имя от расширения
    base_name, extension = os.path.splitext(base_name_with_ext)

    # 3. Удаляем хеши в стиле Webpack (например, .9480c28da0a805029a18)
    # Regex ищет точку, за которой следует 16 или более шестнадцатеричных символов
    cleaned_base_name = re.sub(r'\.([a-f0-9]{16,})\b', '', base_name)
    
    # Возвращаем очищенное имя с оригинальным расширением
    return cleaned_base_name + extension

def restore_project_structure(source_dir, output_dir_name="vortex-clone-structured"):
    """
    Рекурсивно обходит исходную директорию, копирует структуру
    и переименовывает файлы в целевую директорию.
    """
    source_dir = os.path.abspath(source_dir)
    # Создаем папку для вывода рядом с исходной
    output_dir = os.path.join(os.path.dirname(source_dir), output_dir_name)

    if not os.path.isdir(source_dir):
        print(f"ОШИБКА: Исходная директория '{source_dir}' не найдена.")
        return

    if os.path.exists(output_dir):
        print(f"ПРЕДУПРЕЖДЕНИЕ: Директория вывода '{output_dir}' уже существует. Существующие файлы могут быть перезаписаны.")
    else:
        os.makedirs(output_dir)
        print(f"Создана директория для вывода: '{output_dir}'")
    
    print(f"\nНачинаю восстановление структуры из '{os.path.basename(source_dir)}'...")
    
    total_files = 0
    copied_files = 0

    for root, _, files in os.walk(source_dir, topdown=True):
        # Пропускаем папку с результатом, если она внутри исходной
        if os.path.abspath(root).startswith(output_dir):
            continue

        for filename in files:
            total_files += 1
            # Пропускаем сам скрипт
            if filename == os.path.basename(__file__):
                continue

            original_filepath = os.path.join(root, filename)
            
            # Создаем относительный путь, чтобы воссоздать структуру в output_dir
            relative_path = os.path.relpath(root, source_dir)
            target_dir = os.path.join(output_dir, relative_path)
            
            if not os.path.exists(target_dir):
                os.makedirs(target_dir)
            
            new_filename = clean_filename(filename)
            final_destination = os.path.join(target_dir, new_filename)
            
            try:
                # Копируем файл, чтобы не изменять оригинал
                shutil.copy2(original_filepath, final_destination)
                copied_files += 1
                if filename != new_filename:
                    print(f"  - Восстановлено: {os.path.join(relative_path, filename)} -> {new_filename}")

            except Exception as e:
                print(f"Не удалось скопировать {filename}. Ошибка: {e}")

    print(f"\nВосстановление завершено. Обработано файлов: {total_files}. Скопировано: {copied_files}.")
    print(f"Правильная структура проекта находится в папке: '{output_dir}'")
    print("\nТеперь вы можете запустить live-server в новой папке.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Восстанавливает структуру папок и очищает имена файлов ассетов.")
    parser.add_argument(
        'source_directory',
        type=str,
        help='Полный путь к исходной папке со всеми скачанными файлами (например, "D:\\VS\\vortex-clone").'
    )
    args = parser.parse_args()
    
    restore_project_structure(args.source_directory)