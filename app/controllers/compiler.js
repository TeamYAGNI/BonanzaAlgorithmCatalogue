const { Router } = require('express');
const edge = require('edge');
const input = `0 0
5 6
1 # 5 4 6 4
3 2 # 2 6 2
9 1 7 6 3 1 
8 2 7 3 8 6
3 6 1 3 1 2`;

const inputInTheBrowser = `
public class Program
{
    private static int[,] labyrinth;

    public static string Main()
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

        StringBuilder result = new StringBuilder();

        for (int i = 0; i < labyrinth.GetLength(0); i++)
        {
            for (int j = 0; j < labyrinth.GetLength(1); j++)
            {
                result.AppendFormat("{0} ", labyrinth[i, j]);
            }
            result.AppendLine();
        }

        return result.ToString();
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
            console.log(req.body.input);
            const test = edge.func(`using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

public class Startup
{
    static void FakeInput(object input)
    {
        Console.SetIn(new StringReader(input.ToString()));
    }

    public async Task<object> Invoke(object input)
    {
        FakeInput(input);
        return Program.Main();
    }
${req.body.input}
}`);
            test(input, (error, result) => {
                if (error) {
                    throw error;
                }
                console.log(result);
            });
            res.status(200).send();
        });
    app.use('/compiler', router);
};

module.exports = attach;
