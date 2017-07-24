const edge = require('edge');

const getCompilerController = ({ tasks }) => {
    const getCompilerForm = (req, res) => {
        return res.render('compiler');
    };
    const postTaskSolution = (req, res) => {
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
            var task = Task.Factory.StartNew(() => Program.Main(null));
            sw.Start();
            task.Wait(${timeout});
            if (task.IsCompleted)
            {
                sw.Stop();
                writer.Flush();
                var result = writer.GetStringBuilder().ToString();
                return String.Format("{0} {1}", sw.Elapsed, result);
            }
            else
            {
                sw.Stop();
                throw new TimeoutException(sw.Elapsed.ToString());
            }
        }
    }
    ${req.body.input}
}
`);
        const results = [];
        for (let i = 0; i < input.length; i++) {
            boilerplate(input[i], (error, result) => {
                if (error) {
                    results.push([error.name, error.message]);
                } else {
                    results.push(result.trim().split(' '));
                }
            });
        }
        res.send(results);
    };

    return {
        getCompilerForm,
        postTaskSolution,
    };
};

module.exports = { getCompilerController };

const input = [`00000101011101111101011001101000101101100111000011011101000000011101010000100011100000011110001111110000001001010010111100000010111110011011111101011011100110100110010111110
1011101100111011100100000110111010000011000000111000101110000000110101011001110010101000110000000110001000000110110011001110000100110100000000011000000000100011
`];
const timeout = 100;
const inputInTheBrowser = `
    class Program
    {
        static double GetDeleteCost(char bit)
        {
            if (bit == '1')
            {
                return 0.8;
            }
            else
            {
                return 0.9;
            }
        }
        static double GetAddCost(char bit)
        {
            if (bit == '1')
            {
                return 1.2;
            }
            else
            {
                return 1.1;
            }
        }

        static bool CharsAreDifferent(char a, char b)
        {
            return a != b;
        }
        static double GetMinimumCost(double firstOperation, double secondOperation, double thirdOperation)
        {
            return Math.Min(firstOperation, Math.Min(secondOperation, thirdOperation));
        }

        public static void Main(string[] args)
        {
            char[] startCombination = Console.ReadLine().ToCharArray();
            char[] endCombination = Console.ReadLine().ToCharArray();

            double[,] minimumOperationsPrices = new double[startCombination.Length + 1, endCombination.Length + 1];

            minimumOperationsPrices[0, 0] = 0;
            for (int i = 1; i < minimumOperationsPrices.GetLength(0); i++)
            {
                minimumOperationsPrices[i, 0] = GetDeleteCost(startCombination[i - 1]);
                minimumOperationsPrices[i, 0] += minimumOperationsPrices[i - 1, 0];
            }

            for(int i = 1; i < minimumOperationsPrices.GetLength(1); i++)
            {
                minimumOperationsPrices[0, i] = GetAddCost(endCombination[i - 1]);
                minimumOperationsPrices[0, i] += minimumOperationsPrices[0, i - 1];
            }

            for (int i = 1; i < minimumOperationsPrices.GetLength(0); i++)
            {
                for (int j = 1; j < minimumOperationsPrices.GetLength(1); j++)
                {
                    double replaceCost = 0;
                    if (CharsAreDifferent(startCombination[i - 1], endCombination[j -1]))
                    {
                        replaceCost = 1;
                    }

                    replaceCost += minimumOperationsPrices[i - 1, j -1];

                    double addCost = GetAddCost(endCombination[j - 1]);
                    addCost += minimumOperationsPrices[i, j - 1];

                    double deleteCost = GetDeleteCost(startCombination[i - 1]);
                    deleteCost += minimumOperationsPrices[i - 1, j];

                    minimumOperationsPrices[i, j] = GetMinimumCost(replaceCost, addCost, deleteCost);
                }
            }

            Console.WriteLine(minimumOperationsPrices[minimumOperationsPrices.GetLength(0) - 1, minimumOperationsPrices.GetLength(1) - 1]);
        }
    }
`;