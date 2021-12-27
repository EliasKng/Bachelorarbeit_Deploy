import os


dataFiles = os.listdir('./Titles')


def aggregate_text_files(input_path='./Titles', output_path='output.txt'):
    files = os.listdir(input_path)
    lines = []
    for file_name in files:
        with open(input_path + '/' + file_name, 'r') as file:
            lines.append(file.readline())
            file.close()
    as_one_file = '\n'.join(lines)

    with open(output_path, 'w') as file:
        file.write(as_one_file)
        file.close()


aggregate_text_files()