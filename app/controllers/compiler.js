const { Router } = require('express');
const edge = require('edge');
const input = `0 0
5 6
1 # 5 4 6 4
3 2 # 2 6 2
9 1 7 6 3 1 
8 2 7 3 8 6
3 6 1 3 1 2`;
const timeout = 1000;

const inputInTheBrowser = `
public class Program
{
    private static int[,] labyrinth;

    public static void Main()
    {
        int[] startingPosition = Console.ReadLine().Split(' ').Select(int.Parse).ToArray();
        int startRow = startingPosition[0];
        int startCol = startingPosition[1];
        int[] dimensions = Console.ReadLine().Split(' ').Select(int.Parse).ToArray();
        int rows = dimensions[0];
        int cols = dimensions[1];
        labyrinth = new int[rows, cols];

        for (int i = 0; i < rows; i++)
        {
            string[] currentRow = Console.ReadLine().Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            for (int j = 0; j < currentRow.Length; j++)
            {
                if (currentRow[j] != "#")
                {
                    labyrinth[i, j] = int.Parse(currentRow[j]);
                }
                else
                {
                    labyrinth[i, j] = -1;
                }
            }
        }

        while(true){
            
        }
        
        Console.WriteLine(5);
    }
}
`;
const attach = (app) => {
    const router = new Router();

    router
        .get('/', (req, res, next) => {
            return res.render('compiler');
        })
        .post('/', (req, res) => {
            const boilerplate = edge.func(`using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.IO;
using System.Diagnostics;
    
public class Startup
{
    static void FakeInput(object input)
    {
        Console.SetIn(new StringReader(input.ToString()));
    }
    
    public async Task<object> Invoke(object input)
    {
        FakeInput(input);
        using(var writer = new StringWriter())
        {
            Console.SetOut(writer);
            var sw = new Stopwatch();
            var task = new Task(() => Program.Main());
            sw.Start();
            task.Start();
            if (task == await Task.WhenAny(task, Task.Delay(${timeout})))
            {
                await task;
            }
            else
            {
                sw.Stop();
                throw new TimeoutException(sw.Elapsed.ToString());
            }
            sw.Stop();
            writer.Flush();
            var result = writer.GetStringBuilder().ToString();
            return String.Format("{0} {1}", sw.Elapsed, result);
        }      
    }
    ${req.body.input}
}
`);
            boilerplate(input, (error, result) => {
                console.log(error + 'This is error');
                if (error) {
                    res.send(error);
                    return;
                }
                res.send(result);
            });
        });
    app.use('/compiler', router);
};

module.exports = attach;
