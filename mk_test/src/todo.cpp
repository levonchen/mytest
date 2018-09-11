#include "todo.h"

CToDo::CToDo()
{

}

CToDo::~CToDo()
{

}

size_t CToDo::size() const
{
    return this_tasks.size();
}

void CToDo::addTask(const std::string& task)
{
    this_tasks.push_back(task);
}

std::string CToDo::getTask(size_t index) const
{
    if( index < this_tasks.size())
    {
        return this_tasks[index];
    }
    else
    {
        return "";
    }
}