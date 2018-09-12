PROJECT(HELLO)

SET(SRC_LIST main.cpp)
message(status"The binary dir is ${PROJECT_BINARY_DIR}")
message(status"The SOURCE dir is ${PROJECT_SOURCE_DIR}")
ADD_EXECUTABLE(hello main.cpp)