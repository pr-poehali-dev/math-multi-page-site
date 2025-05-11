
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const PREDEFINED_FUNCTIONS = [
  { name: "Линейная", value: "x", color: "#FF5733" },
  { name: "Параболическая", value: "x^2", color: "#33FF57" },
  { name: "Кубическая", value: "x^3", color: "#3357FF" },
  { name: "Синус", value: "sin(x)", color: "#FF33E9" },
  { name: "Косинус", value: "cos(x)", color: "#33FFF5" },
  { name: "Экспонента", value: "e^x", color: "#FFB833" },
  { name: "Логарифм", value: "log(x)", color: "#8C33FF" },
];

interface GraphSettings {
  expression: string;
  color: string;
  visible: boolean;
}

const DEFAULT_X_RANGE = [-10, 10];
const DEFAULT_Y_RANGE = [-10, 10];

const GraphCalculator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [graphs, setGraphs] = useState<GraphSettings[]>([
    { expression: "x^2", color: "#33FF57", visible: true }
  ]);
  const [newExpression, setNewExpression] = useState("");
  const [newColor, setNewColor] = useState("#3357FF");
  const [xRange, setXRange] = useState<[number, number]>(DEFAULT_X_RANGE);
  const [yRange, setYRange] = useState<[number, number]>(DEFAULT_Y_RANGE);
  const [gridVisible, setGridVisible] = useState(true);
  const [axesVisible, setAxesVisible] = useState(true);
  const [error, setError] = useState("");
  
  // Функция для парсинга математического выражения
  const evaluateExpression = (expression: string, x: number): number => {
    try {
      // Заменяем математические функции и константы на их JavaScript эквиваленты
      const jsExpression = expression
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/abs\(/g, "Math.abs(")
        .replace(/e\^/g, "Math.exp(")
        .replace(/\^/g, "**")
        .replace(/pi/g, "Math.PI")
        .replace(/e(?![a-zA-Z])/g, "Math.E");
      
      // Заменяем x на значение и вычисляем
      const result = eval(jsExpression.replace(/x/g, `(${x})`));
      return typeof result === "number" && isFinite(result) ? result : NaN;
    } catch (e) {
      return NaN;
    }
  };
  
  // Преобразование координат
  const transformX = (x: number, ctx: CanvasRenderingContext2D): number => {
    const { width } = ctx.canvas;
    return ((x - xRange[0]) / (xRange[1] - xRange[0])) * width;
  };
  
  const transformY = (y: number, ctx: CanvasRenderingContext2D): number => {
    const { height } = ctx.canvas;
    return height - ((y - yRange[0]) / (yRange[1] - yRange[0])) * height;
  };
  
  // Преобразование обратно в координаты графика
  const inverseTransformX = (x: number, ctx: CanvasRenderingContext2D): number => {
    const { width } = ctx.canvas;
    return xRange[0] + (x / width) * (xRange[1] - xRange[0]);
  };
  
  // Отрисовка графика
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Очищаем холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем сетку
    if (gridVisible) {
      drawGrid(ctx);
    }
    
    // Рисуем оси
    if (axesVisible) {
      drawAxes(ctx);
    }
    
    // Рисуем графики функций
    graphs.forEach(graph => {
      if (graph.visible) {
        drawFunction(ctx, graph.expression, graph.color);
      }
    });
  };
  
  // Рисуем сетку
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    ctx.strokeStyle = "#E5E7EB";
    ctx.lineWidth = 0.5;
    
    // Шаг сетки (в единицах графика)
    const stepX = (xRange[1] - xRange[0]) / 20;
    const stepY = (yRange[1] - yRange[0]) / 20;
    
    // Рисуем вертикальные линии
    for (let x = Math.ceil(xRange[0] / stepX) * stepX; x <= xRange[1]; x += stepX) {
      ctx.beginPath();
      ctx.moveTo(transformX(x, ctx), 0);
      ctx.lineTo(transformX(x, ctx), height);
      ctx.stroke();
    }
    
    // Рисуем горизонтальные линии
    for (let y = Math.ceil(yRange[0] / stepY) * stepY; y <= yRange[1]; y += stepY) {
      ctx.beginPath();
      ctx.moveTo(0, transformY(y, ctx));
      ctx.lineTo(width, transformY(y, ctx));
      ctx.stroke();
    }
  };
  
  // Рисуем оси
  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    
    // Ось X
    if (yRange[0] <= 0 && yRange[1] >= 0) {
      const yZero = transformY(0, ctx);
      ctx.beginPath();
      ctx.moveTo(0, yZero);
      ctx.lineTo(width, yZero);
      ctx.stroke();
      
      // Стрелка на конце оси X
      ctx.beginPath();
      ctx.moveTo(width, yZero);
      ctx.lineTo(width - 10, yZero - 5);
      ctx.lineTo(width - 10, yZero + 5);
      ctx.fill();
      
      // Метки на оси X
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = "12px Arial";
      for (let x = Math.ceil(xRange[0]); x <= xRange[1]; x++) {
        if (x === 0) continue; // Пропускаем 0, чтобы избежать наложения меток
        const xPos = transformX(x, ctx);
        ctx.beginPath();
        ctx.moveTo(xPos, yZero - 5);
        ctx.lineTo(xPos, yZero + 5);
        ctx.stroke();
        ctx.fillText(x.toString(), xPos, yZero + 8);
      }
    }
    
    // Ось Y
    if (xRange[0] <= 0 && xRange[1] >= 0) {
      const xZero = transformX(0, ctx);
      ctx.beginPath();
      ctx.moveTo(xZero, 0);
      ctx.lineTo(xZero, height);
      ctx.stroke();
      
      // Стрелка на конце оси Y
      ctx.beginPath();
      ctx.moveTo(xZero, 0);
      ctx.lineTo(xZero - 5, 10);
      ctx.lineTo(xZero + 5, 10);
      ctx.fill();
      
      // Метки на оси Y
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let y = Math.ceil(yRange[0]); y <= yRange[1]; y++) {
        if (y === 0) continue; // Пропускаем 0, чтобы избежать наложения меток
        const yPos = transformY(y, ctx);
        ctx.beginPath();
        ctx.moveTo(xZero - 5, yPos);
        ctx.lineTo(xZero + 5, yPos);
        ctx.stroke();
        ctx.fillText(y.toString(), xZero - 8, yPos);
      }
    }
    
    // Метка "0" в начале координат
    if (xRange[0] <= 0 && xRange[1] >= 0 && yRange[0] <= 0 && yRange[1] >= 0) {
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText("0", transformX(0, ctx) - 4, transformY(0, ctx) + 4);
    }
  };
  
  // Рисуем функцию
  const drawFunction = (ctx: CanvasRenderingContext2D, expression: string, color: string) => {
    const { width } = ctx.canvas;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    let isFirstPoint = true;
    let lastY: number | null = null;
    
    for (let i = 0; i <= width; i++) {
      const x = inverseTransformX(i, ctx);
      const y = evaluateExpression(expression, x);
      
      if (!isNaN(y)) {
        const canvasY = transformY(y, ctx);
        
        // Проверяем разрыв функции (большое изменение y)
        if (isFirstPoint || (lastY !== null && Math.abs(canvasY - lastY) < 100)) {
          if (isFirstPoint) {
            ctx.moveTo(i, canvasY);
            isFirstPoint = false;
          } else {
            ctx.lineTo(i, canvasY);
          }
        } else {
          // Если был разрыв, начинаем новую линию
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(i, canvasY);
        }
        
        lastY = canvasY;
      }
    }
    
    ctx.stroke();
  };
  
  // Добавляем новый график
  const addGraph = () => {
    if (!newExpression.trim()) {
      setError("Введите выражение");
      return;
    }
    
    try {
      // Проверяем корректность выражения
      evaluateExpression(newExpression, 1);
      
      setGraphs([...graphs, {
        expression: newExpression,
        color: newColor,
        visible: true
      }]);
      
      setNewExpression("");
      setError("");
    } catch (e) {
      setError("Некорректное выражение");
    }
  };
  
  // Удаляем график
  const removeGraph = (index: number) => {
    setGraphs(graphs.filter((_, i) => i !== index));
  };
  
  // Переключаем видимость графика
  const toggleGraphVisibility = (index: number) => {
    setGraphs(graphs.map((graph, i) => 
      i === index ? { ...graph, visible: !graph.visible } : graph
    ));
  };
  
  // Добавляем предопределенную функцию
  const addPredefinedFunction = (func: { name: string; value: string; color: string }) => {
    setGraphs([...graphs, {
      expression: func.value,
      color: func.color,
      visible: true
    }]);
  };
  
  // Обновляем диапазон X
  const updateXRange = (values: number[]) => {
    setXRange([values[0], values[1]]);
  };
  
  // Обновляем диапазон Y
  const updateYRange = (values: number[]) => {
    setYRange([values[0], values[1]]);
  };
  
  // Сбрасываем настройки графика
  const resetGraph = () => {
    setXRange(DEFAULT_X_RANGE);
    setYRange(DEFAULT_Y_RANGE);
    setGridVisible(true);
    setAxesVisible(true);
    setGraphs([{ expression: "x^2", color: "#33FF57", visible: true }]);
  };
  
  // Обновляем график при изменении настроек
  useEffect(() => {
    drawGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphs, xRange, yRange, gridVisible, axesVisible]);
  
  // Изменяем размер холста при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parentDiv = canvasRef.current.parentElement;
        if (parentDiv) {
          canvasRef.current.width = parentDiv.clientWidth;
          canvasRef.current.height = parentDiv.clientWidth * 0.6;
          drawGraph();
        }
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Графический калькулятор</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Стройте и исследуйте графики функций с помощью нашего интерактивного калькулятора
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>График функции</CardTitle>
                <CardDescription>
                  Визуализация математических функций
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-md p-2">
                  <canvas 
                    ref={canvasRef}
                    className="w-full border rounded-md bg-white"
                    height={400}
                  />
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Диапазон по X: [{xRange[0]}, {xRange[1]}]</Label>
                      <Slider
                        className="mt-1"
                        min={-50}
                        max={50}
                        step={1}
                        value={[xRange[0], xRange[1]]}
                        onValueChange={updateXRange}
                      />
                    </div>
                    <div>
                      <Label>Диапазон по Y: [{yRange[0]}, {yRange[1]}]</Label>
                      <Slider
                        className="mt-1"
                        min={-50}
                        max={50}
                        step={1}
                        value={[yRange[0], yRange[1]]}
                        onValueChange={updateYRange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="grid" 
                        checked={gridVisible} 
                        onCheckedChange={(checked) => setGridVisible(checked as boolean)} 
                      />
                      <Label htmlFor="grid">Показать сетку</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="axes" 
                        checked={axesVisible} 
                        onCheckedChange={(checked) => setAxesVisible(checked as boolean)} 
                      />
                      <Label htmlFor="axes">Показать оси</Label>
                    </div>
                    <Button variant="outline" onClick={resetGraph}>Сбросить настройки</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Функции</CardTitle>
                <CardDescription>
                  Управление графиками функций
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="custom">
                  <TabsList className="w-full">
                    <TabsTrigger value="custom">Своя функция</TabsTrigger>
                    <TabsTrigger value="predefined">Готовые функции</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="custom" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="expression">Введите функцию (используйте x как переменную)</Label>
                      <Input
                        id="expression"
                        placeholder="Например: sin(x)"
                        value={newExpression}
                        onChange={(e) => setNewExpression(e.target.value)}
                      />
                      {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="color">Цвет графика</Label>
                      <Input
                        id="color"
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="h-10 w-full p-1"
                      />
                    </div>
                    
                    <Button onClick={addGraph} className="w-full">Добавить график</Button>
                  </TabsContent>
                  
                  <TabsContent value="predefined" className="mt-4">
                    <div className="grid grid-cols-1 gap-2">
                      {PREDEFINED_FUNCTIONS.map((func, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start"
                          onClick={() => addPredefinedFunction(func)}
                        >
                          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: func.color }}></div>
                          <span>{func.name}: {func.value}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Активные функции:</h3>
                  <div className="space-y-2">
                    {graphs.map((graph, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: graph.color, opacity: graph.visible ? 1 : 0.3 }}
                          ></div>
                          <span className={`text-sm ${graph.visible ? '' : 'line-through opacity-50'}`}>
                            {graph.expression}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleGraphVisibility(index)}
                            className="h-6 w-6 p-0"
                          >
                            {graph.visible ? "👁️" : "👁️‍🗨️"}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeGraph(index)}
                            className="h-6 w-6 p-0 text-red-500"
                          >
                            ✖
                          </Button>
                        </div>
                      </div>
                    ))}
                    {graphs.length === 0 && (
                      <p className="text-sm text-muted-foreground">Нет активных функций</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Справка:</h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>- Используйте x как переменную</p>
                    <p>- Поддерживаемые операции: +, -, *, /, ^</p>
                    <p>- Функции: sin, cos, tan, log, sqrt, abs</p>
                    <p>- Константы: pi, e</p>
                    <p>- Примеры: sin(x), x^2 + 2*x + 1, e^(-x)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">МатМастер</h3>
              <p className="text-gray-400">Ваш проводник в мире высшей математики</p>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-gray-400 hover:text-white">О нас</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Контакты</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Условия использования</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} МатМастер. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GraphCalculator;
