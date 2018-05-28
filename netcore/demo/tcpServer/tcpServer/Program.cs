using System;

namespace tcpServer
{
    class Program
    {
        static void Main(string[] args)
        {
            tcpUtil.Util myUtil = new tcpUtil.Util();
            myUtil.X = 60;
            Console.WriteLine("Hello World! My Util is: " + myUtil.X );
        }
    }
}
