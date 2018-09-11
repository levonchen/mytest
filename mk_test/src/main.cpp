#include <iostream>

using namespace std;

#include "functions.h"

#include "todo.h"

#define EXPECT_EQUAL(test,expect) equalityTest(test,expect,#test,#expect,__FILE__,__LINE__)

template< typename T1, typename T2 >
int equalityTest(   const T1 testValue,
                    const T2 expectedValue,
                    const char* testname,
                    const char* expectedName,
                    const char* fileName,
                    const char* lineNumber);



int main()
{
    print_hello();
    cout << endl;
    cout << "The factorial of 5 is " << factorial(5) <<endl;

    CToDo list;

    list.addTask("Write code");
    list.addTask("compile");
    list.addTask("test");

    int result = 0;
    
    result |= EXPECT_EQUAL(list.size(),3);

    result |= EXPECT_EQUAL(list.getTask(0),"Write code");

    return 0;
}

template <typename T1, typename T2>
int equalityTest(
    const T1 testValue,
    const T2 expectedValue,
    const char *testname,
    const char *expectedName,
    const char *fileName,
    const char *lineNumber)
{
    if(testValue != expectedValue)
    {
        std::cerr << fileName << "," <<lineNumber <<":" <<endl;
        std::cerr << "--------- Expected " << testname << " to equal" 
                  << expectedName<<endl;
        std::cerr << "--------- But " <<expectedValue << " no equal " <<testValue <<endl;
        return 1;
    }
    else
    {
        return 0;
    }
}
