const edge = require('edge');

const getCompilerController = ({ tasks }) => {
    const getTasksList = (req, res) => {
        tasks.getAll()
            .then((data) => {
                const context = {
                    tasks: data,
                };
                res.render('tasks', context);
            });
    };
    const getCompilerForm = (req, res) => {
        const id = req.params.id;
        tasks.findById(id)
            .then((task) => {
                const context = {
                    task: task,
                };
                return context;
            })
            .then((context) => {
                return res.render('compiler', context);
            });
    };
    const postTaskSolution = (req, res) => {
        console.log(req.body);
        const id = req.params.id;
        tasks.findById(id)
            .then((task) => {
                const boilerplate = edge.func(
`using System;
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
            var task = Task.Factory.StartNew(() => Program.Main());
            sw.Start();
            task.Wait(${+task.timelimit});
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
    ${req.body}
}`);
                const results = [];
                for (let i = 0; i < task.input.length; i++) {
                    boilerplate(task.input[i], (error, result) => {
                        if (error) {
                            results.push({
                                status: 'failed',
                                reason: error.name,
                                message: error.message,
                            });
                        } else {
                            const current = result.trim().split(' ');
                            if (task.results[i].trim() === current[1]) {
                                results.push({
                                    status: 'passed',
                                    reason: '',
                                    message: current[0],
                                });
                            } else {
                                results.push({
                                    status: 'failed',
                                    reason: 'wrong result',
                                    message: current[0],
                                });
                            }
                        }
                    });
                }
                return results;
            })
            .then((results) => {
                res.send(results);
            })
            .catch((error) => {
                res.send(error);
            });
    };

    return {
        getTasksList,
        getCompilerForm,
        postTaskSolution,
    };
};

module.exports = { getCompilerController };
