import subprocess
import utils

START_COMMAND = ["python3", "GUI/temp_input.py"]

def main():
    proc = ProcessHandler(START_COMMAND)
    message = proc.process.communicate("\n".encode("ascii"))
    print(message[0].decode("utf-8"))

class ProcessHandler:
    def __init__(self, starting_command):
        self.process = subprocess.Popen(
            START_COMMAND, 
            stdin=subprocess.PIPE, 
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        def get_record(self, index: int):
            pass

        def get_record_dummy(self, index: int) -> str:
            return utils.get_file_as_text("GUI/sample_return.txt")

if __name__ == "__main__":
    main()

