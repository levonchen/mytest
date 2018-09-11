cmake_minimum_required(VERSION 2.8)
project("hello")

aux_source_directory(. DIRSRCS)

add_executable( hello $(DIRSRCS))