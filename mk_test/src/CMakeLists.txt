
project("hello")

aux_source_directory(. DIRSRCS)

add_executable( hello $(DIRSRCS))