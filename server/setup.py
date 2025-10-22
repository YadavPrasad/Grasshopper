from setuptools import setup, find_packages

with open("requirements.txt") as f:
    requirements = f.read().splitlines()

setup(
    name="Grasshopper",
    version="1.1",
    author="Yadav Prasad G B",
    packages=find_packages(),
    install_requires = requirements,
)