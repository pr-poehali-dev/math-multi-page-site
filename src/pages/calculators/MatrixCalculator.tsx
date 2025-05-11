
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const MatrixCalculator = () => {
  // Размеры матриц
  const [matrixARows, setMatrixARows] = useState(3);
  const [matrixACols, setMatrixACols] = useState(3);
  const [matrixBRows, setMatrixBRows] = useState(3);
  const [matrixBCols, setMatrixBCols] = useState(3);
  
  // Матрицы А и В
  const [matrixA, setMatrixA] = useState<number[][]>(
    Array(3).fill(0).map(() => Array(3).fill(0))
  );
  const [matrixB, setMatrixB] = useState<number[][]>(
    Array(3).fill(0).map(() => Array(3).fill(0))
  );
  
  // Результирующая матрица
  const [resultMatrix, setResultMatrix] = useState<number[][]>([]);
  const [resultScalar, setResultScalar] = useState<number | null>(null);
  
  // Дополнительные параметры
  const [scalarValue, setScalarValue] = useState<number>(2);
  
  // Сообщения об ошибках или информационные сообщения
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  
  // Изменение размера матрицы A
  const resizeMatrixA = (rows: number, cols: number) => {
    setMatrixARows(rows);
    setMatrixACols(cols);
    setMatrixA(Array(rows).fill(0).map(() => Array(cols).fill(0)));
  };
  
  // Изменение размера матрицы B
  const resizeMatrixB = (rows: number, cols: number) => {
    setMatrixBRows(rows);
    setMatrixBCols(cols);
    setMatrixB(Array(rows).fill(0).map(() => Array(cols).fill(0)));
  };
  
  // Обновление значения в матрице A
  const updateMatrixA = (rowIndex: number, colIndex: number, value: string) => {
    const newValue = value === "" ? 0 : parseFloat(value);
    if (!isNaN(newValue)) {
      const newMatrix = [...matrixA];
      newMatrix[rowIndex][colIndex] = newValue;
      setMatrixA(newMatrix);
    }
  };
  
  // Обновление значения в матрице B
  const updateMatrixB = (rowIndex: number, colIndex: number, value: string) => {
    const newValue = value === "" ? 0 : parseFloat(value);
    if (!isNaN(newValue)) {
      const newMatrix = [...matrixB];
      newMatrix[rowIndex][colIndex] = newValue;
      setMatrixB(newMatrix);
    }
  };
  
  // Заполнение матрицы случайными числами
  const fillRandomValues = (matrix: "A" | "B") => {
    if (matrix === "A") {
      const newMatrix = Array(matrixARows).fill(0).map(() => 
        Array(matrixACols).fill(0).map(() => Math.floor(Math.random() * 10) - 5)
      );
      setMatrixA(newMatrix);
    } else {
      const newMatrix = Array(matrixBRows).fill(0).map(() => 
        Array(matrixBCols).fill(0).map(() => Math.floor(Math.random() * 10) - 5)
      );
      setMatrixB(newMatrix);
    }
  };
  
  // Очистка матрицы (заполнение нулями)
  const clearMatrix = (matrix: "A" | "B") => {
    if (matrix === "A") {
      setMatrixA(Array(matrixARows).fill(0).map(() => Array(matrixACols).fill(0)));
    } else {
      setMatrixB(Array(matrixBRows).fill(0).map(() => Array(matrixBCols).fill(0)));
    }
  };
  
  // Заполнение единичной матрицы
  const fillIdentityMatrix = (matrix: "A" | "B") => {
    if (matrix === "A") {
      if (matrixARows !== matrixACols) {
        setError("Единичная матрица должна быть квадратной");
        return;
      }
      
      const newMatrix = Array(matrixARows).fill(0).map((_, i) => 
        Array(matrixACols).fill(0).map((_, j) => i === j ? 1 : 0)
      );
      setMatrixA(newMatrix);
      setError(null);
    } else {
      if (matrixBRows !== matrixBCols) {
        setError("Единичная матрица должна быть квадратной");
        return;
      }
      
      const newMatrix = Array(matrixBRows).fill(0).map((_, i) => 
        Array(matrixBCols).fill(0).map((_, j) => i === j ? 1 : 0)
      );
      setMatrixB(newMatrix);
      setError(null);
    }
  };
  
  // Функции для выполнения операций с матрицами
  
  // Сложение матриц
  const addMatrices = () => {
    setInfo(null);
    setResultScalar(null);
    
    if (matrixARows !== matrixBRows || matrixACols !== matrixBCols) {
      setError("Для сложения матрицы должны иметь одинаковые размеры");
      setResultMatrix([]);
      return;
    }
    
    const result = matrixA.map((row, i) =>
      row.map((val, j) => val + matrixB[i][j])
    );
    
    setResultMatrix(result);
    setError(null);
    setInfo(`Результат сложения матриц ${matrixARows}×${matrixACols}`);
  };
  
  // Вычитание матриц
  const subtractMatrices = () => {
    setInfo(null);
    setResultScalar(null);
    
    if (matrixARows !== matrixBRows || matrixACols !== matrixBCols) {
      setError("Для вычитания матрицы должны иметь одинаковые размеры");
      setResultMatrix([]);
      return;
    }
    
    const result = matrixA.map((row, i) =>
      row.map((val, j) => val - matrixB[i][j])
    );
    
    setResultMatrix(result);
    setError(null);
    setInfo(`Результат вычитания матриц ${matrixARows}×${matrixACols}`);
  };
  
  // Умножение матриц
  const multiplyMatrices = () => {
    setInfo(null);
    setResultScalar(null);
    
    if (matrixACols !== matrixBRows) {
      setError("Для умножения число столбцов первой матрицы должно быть равно числу строк второй матрицы");
      setResultMatrix([]);
      return;
    }
    
    const result = Array(matrixARows).fill(0).map(() => Array(matrixBCols).fill(0));
    
    for (let i = 0; i < matrixARows; i++) {
      for (let j = 0; j < matrixBCols; j++) {
        let sum = 0;
        for (let k = 0; k < matrixACols; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        result[i][j] = sum;
      }
    }
    
    setResultMatrix(result);
    setError(null);
    setInfo(`Результат умножения матриц ${matrixARows}×${matrixBCols}`);
  };
  
  // Транспонирование матрицы
  const transposeMatrix = (matrix: "A" | "B") => {
    setInfo(null);
    setResultScalar(null);
    
    const sourceMatrix = matrix === "A" ? matrixA : matrixB;
    const rows = matrix === "A" ? matrixARows : matrixBRows;
    const cols = matrix === "A" ? matrixACols : matrixBCols;
    
    const result = Array(cols).fill(0).map(() => Array(rows).fill(0));
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        result[j][i] = sourceMatrix[i][j];
      }
    }
    
    setResultMatrix(result);
    setError(null);
    setInfo(`Результат транспонирования матрицы ${matrix}: ${cols}×${rows}`);
  };
  
  // Умножение матрицы на скаляр
  const multiplyByScalar = (matrix: "A" | "B") => {
    setInfo(null);
    setResultScalar(null);
    
    const sourceMatrix = matrix === "A" ? matrixA : matrixB;
    const rows = matrix === "A" ? matrixARows : matrixBRows;
    const cols = matrix === "A" ? matrixACols : matrixBCols;
    
    const result = sourceMatrix.map(row =>
      row.map(val => val * scalarValue)
    );
    
    setResultMatrix(result);
    setError(null);
    setInfo(`Результат умножения матрицы ${matrix} на скаляр ${scalarValue}: ${rows}×${cols}`);
  };
  
  // Вычисление определителя матрицы
  const calculateDeterminant = (matrix: "A" | "B") => {
    setInfo(null);
    setResultMatrix([]);
    
    const sourceMatrix = matrix === "A" ? matrixA : matrixB;
    const size = matrix === "A" ? matrixARows : matrixBRows;
    
    if ((matrix === "A" && matrixARows !== matrixACols) || 
        (matrix === "B" && matrixBRows !== matrixBCols)) {
      setError("Определитель можно вычислить только для квадратной матрицы");
      setResultScalar(null);
      return;
    }
    
    if (size > 4) {
      setError("Вычисление определителя для матриц размером больше 4×4 в данной реализации не поддерживается");
      setResultScalar(null);
      return;
    }
    
    // Вычисление определителя
    let determinant = 0;
    
    if (size === 1) {
      determinant = sourceMatrix[0][0];
    } else if (size === 2) {
      determinant = sourceMatrix[0][0] * sourceMatrix[1][1] - sourceMatrix[0][1] * sourceMatrix[1][0];
    } else if (size === 3) {
      determinant = 
        sourceMatrix[0][0] * (sourceMatrix[1][1] * sourceMatrix[2][2] - sourceMatrix[1][2] * sourceMatrix[2][1]) -
        sourceMatrix[0][1] * (sourceMatrix[1][0] * sourceMatrix[2][2] - sourceMatrix[1][2] * sourceMatrix[2][0]) +
        sourceMatrix[0][2] * (sourceMatrix[1][0] * sourceMatrix[2][1] - sourceMatrix[1][1] * sourceMatrix[2][0]);
    } else if (size === 4) {
      // Вычисление методом разложения по первой строке
      for (let j = 0; j < 4; j++) {
        // Создаем подматрицу 3x3, исключая первую строку и j-й столбец
        const subMatrix = Array(3).fill(0).map(() => Array(3).fill(0));
        for (let row = 1; row < 4; row++) {
          let subCol = 0;
          for (let col = 0; col < 4; col++) {
            if (col !== j) {
              subMatrix[row-1][subCol] = sourceMatrix[row][col];
              subCol++;
            }
          }
        }
        
        // Вычисляем определитель подматрицы 3x3
        const subDet = 
          subMatrix[0][0] * (subMatrix[1][1] * subMatrix[2][2] - subMatrix[1][2] * subMatrix[2][1]) -
          subMatrix[0][1] * (subMatrix[1][0] * subMatrix[2][2] - subMatrix[1][2] * subMatrix[2][0]) +
          subMatrix[0][2] * (subMatrix[1][0] * subMatrix[2][1] - subMatrix[1][1] * subMatrix[2][0]);
        
        // Добавляем к результату с учетом знака
        determinant += sourceMatrix[0][j] * subDet * (j % 2 === 0 ? 1 : -1);
      }
    }
    
    setResultScalar(determinant);
    setError(null);
    setInfo(`Определитель матрицы ${matrix} ${size}×${size}`);
  };
  
  // Вычисление обратной матрицы
  const calculateInverse = (matrix: "A" | "B") => {
    setInfo(null);
    setResultScalar(null);
    
    const sourceMatrix = matrix === "A" ? matrixA : matrixB;
    const size = matrix === "A" ? matrixARows : matrixBRows;
    
    if ((matrix === "A" && matrixARows !== matrixACols) || 
        (matrix === "B" && matrixBRows !== matrixBCols)) {
      setError("Обратную матрицу можно вычислить только для квадратной матрицы");
      setResultMatrix([]);
      return;
    }
    
    if (size > 3) {
      setError("Вычисление обратной матрицы для матриц размером больше 3×3 в данной реализации не поддерживается");
      setResultMatrix([]);
      return;
    }
    
    // Вычисляем определитель
    let determinant = 0;
    
    if (size === 1) {
      determinant = sourceMatrix[0][0];
      
      if (determinant === 0) {
        setError("Обратная матрица не существует, так как определитель равен нулю");
        setResultMatrix([]);
        return;
      }
      
      setResultMatrix([[1 / determinant]]);
      setError(null);
      setInfo(`Обратная матрица для ${matrix} 1×1`);
      return;
    } else if (size === 2) {
      determinant = sourceMatrix[0][0] * sourceMatrix[1][1] - sourceMatrix[0][1] * sourceMatrix[1][0];
      
      if (Math.abs(determinant) < 1e-10) {
        setError("Обратная матрица не существует, так как определитель практически равен нулю");
        setResultMatrix([]);
        return;
      }
      
      const result = [
        [sourceMatrix[1][1] / determinant, -sourceMatrix[0][1] / determinant],
        [-sourceMatrix[1][0] / determinant, sourceMatrix[0][0] / determinant]
      ];
      
      setResultMatrix(result);
      setError(null);
      setInfo(`Обратная матрица для ${matrix} 2×2`);
      return;
    } else if (size === 3) {
      determinant = 
        sourceMatrix[0][0] * (sourceMatrix[1][1] * sourceMatrix[2][2] - sourceMatrix[1][2] * sourceMatrix[2][1]) -
        sourceMatrix[0][1] * (sourceMatrix[1][0] * sourceMatrix[2][2] - sourceMatrix[1][2] * sourceMatrix[2][0]) +
        sourceMatrix[0][2] * (sourceMatrix[1][0] * sourceMatrix[2][1] - sourceMatrix[1][1] * sourceMatrix[2][0]);
      
      if (Math.abs(determinant) < 1e-10) {
        setError("Обратная матрица не существует, так как определитель практически равен нулю");
        setResultMatrix([]);
        return;
      }
      
      // Вычисляем матрицу алгебраических дополнений (транспонированную)
      const cofactors = Array(3).fill(0).map(() => Array(3).fill(0));
      
      cofactors[0][0] = (sourceMatrix[1][1] * sourceMatrix[2][2] - sourceMatrix[1][2] * sourceMatrix[2][1]);
      cofactors[1][0] = -(sourceMatrix[1][0] * sourceMatrix[2][2] - sourceMatrix[1][2] * sourceMatrix[2][0]);
      cofactors[2][0] = (sourceMatrix[1][0] * sourceMatrix[2][1] - sourceMatrix[1][1] * sourceMatrix[2][0]);
      
      cofactors[0][1] = -(sourceMatrix[0][1] * sourceMatrix[2][2] - sourceMatrix[0][2] * sourceMatrix[2][1]);
      cofactors[1][1] = (sourceMatrix[0][0] * sourceMatrix[2][2] - sourceMatrix[0][2] * sourceMatrix[2][0]);
      cofactors[2][1] = -(sourceMatrix[0][0] * sourceMatrix[2][1] - sourceMatrix[0][1] * sourceMatrix[2][0]);
      
      cofactors[0][2] = (sourceMatrix[0][1] * sourceMatrix[1][2] - sourceMatrix[0][2] * sourceMatrix[1][1]);
      cofactors[1][2] = -(sourceMatrix[0][0] * sourceMatrix[1][2] - sourceMatrix[0][2] * sourceMatrix[1][0]);
      cofactors[2][2] = (sourceMatrix[0][0] * sourceMatrix[1][1] - sourceMatrix[0][1] * sourceMatrix[1][0]);
      
      // Делим каждый элемент на определитель
      const result = cofactors.map(row =>
        row.map(val => val / determinant)
      );
      
      setResultMatrix(result);
      setError(null);
      setInfo(`Обратная матрица для ${matrix} 3×3`);
      return;
    }
  };
  
  // Копирование матрицы результата в матрицу A или B
  const copyResultTo = (matrix: "A" | "B") => {
    if (resultMatrix.length === 0) {
      setError("Нет результата для копирования");
      return;
    }
    
    if (matrix === "A") {
      setMatrixARows(resultMatrix.length);
      setMatrixACols(resultMatrix[0].length);
      setMatrixA([...resultMatrix]);
    } else {
      setMatrixBRows(resultMatrix.length);
      setMatrixBCols(resultMatrix[0].length);
      setMatrixB([...resultMatrix]);
    }
    
    setError(null);
    setInfo(`Результат скопирован в матрицу ${matrix}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Матричный калькулятор</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Выполняйте операции с матрицами любых размеров
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Матрица A</CardTitle>
              <CardDescription>
                Первая матрица для операций
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-1 items-center gap-2">
                    <Label htmlFor="matrixARows">Строк:</Label>
                    <Select
                      value={matrixARows.toString()}
                      onValueChange={(value) => resizeMatrixA(parseInt(value), matrixACols)}
                    >
                      <SelectTrigger id="matrixARows" className="w-24">
                        <SelectValue placeholder="Строки" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-1 items-center gap-2">
                    <Label htmlFor="matrixACols">Столбцов:</Label>
                    <Select
                      value={matrixACols.toString()}
                      onValueChange={(value) => resizeMatrixA(matrixARows, parseInt(value))}
                    >
                      <SelectTrigger id="matrixACols" className="w-24">
                        <SelectValue placeholder="Столбцы" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-2 border rounded-md overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {Array(matrixARows).fill(0).map((_, rowIndex) => (
                        <tr key={`A-row-${rowIndex}`}>
                          {Array(matrixACols).fill(0).map((_, colIndex) => (
                            <td key={`A-${rowIndex}-${colIndex}`} className="p-1">
                              <Input
                                type="number"
                                value={matrixA[rowIndex][colIndex] === 0 ? "" : matrixA[rowIndex][colIndex].toString()}
                                onChange={(e) => updateMatrixA(rowIndex, colIndex, e.target.value)}
                                className="h-10 w-16 text-center"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillRandomValues("A")}
                  >
                    Случайные числа
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearMatrix("A")}
                  >
                    Очистить
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillIdentityMatrix("A")}
                  >
                    Единичная
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Матрица B</CardTitle>
              <CardDescription>
                Вторая матрица для операций
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-1 items-center gap-2">
                    <Label htmlFor="matrixBRows">Строк:</Label>
                    <Select
                      value={matrixBRows.toString()}
                      onValueChange={(value) => resizeMatrixB(parseInt(value), matrixBCols)}
                    >
                      <SelectTrigger id="matrixBRows" className="w-24">
                        <SelectValue placeholder="Строки" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-1 items-center gap-2">
                    <Label htmlFor="matrixBCols">Столбцов:</Label>
                    <Select
                      value={matrixBCols.toString()}
                      onValueChange={(value) => resizeMatrixB(matrixBRows, parseInt(value))}
                    >
                      <SelectTrigger id="matrixBCols" className="w-24">
                        <SelectValue placeholder="Столбцы" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-2 border rounded-md overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {Array(matrixBRows).fill(0).map((_, rowIndex) => (
                        <tr key={`B-row-${rowIndex}`}>
                          {Array(matrixBCols).fill(0).map((_, colIndex) => (
                            <td key={`B-${rowIndex}-${colIndex}`} className="p-1">
                              <Input
                                type="number"
                                value={matrixB[rowIndex][colIndex] === 0 ? "" : matrixB[rowIndex][colIndex].toString()}
                                onChange={(e) => updateMatrixB(rowIndex, colIndex, e.target.value)}
                                className="h-10 w-16 text-center"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillRandomValues("B")}
                  >
                    Случайные числа
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearMatrix("B")}
                  >
                    Очистить
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillIdentityMatrix("B")}
                  >
                    Единичная
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Операции с матрицами</CardTitle>
              <CardDescription>
                Выберите операцию для выполнения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic-operations" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="basic-operations">Основные операции</TabsTrigger>
                  <TabsTrigger value="advanced-operations">Дополнительные операции</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic-operations" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button onClick={addMatrices}>
                      <Icon name="Plus" className="mr-2 h-4 w-4" />
                      A + B
                    </Button>
                    <Button onClick={subtractMatrices}>
                      <Icon name="Minus" className="mr-2 h-4 w-4" />
                      A - B
                    </Button>
                    <Button onClick={multiplyMatrices}>
                      <Icon name="X" className="mr-2 h-4 w-4" />
                      A × B
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="w-full sm:w-64">
                      <Label htmlFor="scalarValue" className="mb-2 block">Скаляр</Label>
                      <Input
                        id="scalarValue"
                        type="number"
                        value={scalarValue}
                        onChange={(e) => setScalarValue(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <Button onClick={() => multiplyByScalar("A")} className="flex-1">
                      <Icon name="X" className="mr-2 h-4 w-4" />
                      {scalarValue} × A
                    </Button>
                    <Button onClick={() => multiplyByScalar("B")} className="flex-1">
                      <Icon name="X" className="mr-2 h-4 w-4" />
                      {scalarValue} × B
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced-operations" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button onClick={() => transposeMatrix("A")}>
                      <Icon name="MoveHorizontal" className="mr-2 h-4 w-4" />
                      Транспонировать A
                    </Button>
                    <Button onClick={() => transposeMatrix("B")}>
                      <Icon name="MoveHorizontal" className="mr-2 h-4 w-4" />
                      Транспонировать B
                    </Button>
                    <Button onClick={() => calculateDeterminant("A")}>
                      <Icon name="Hash" className="mr-2 h-4 w-4" />
                      Определитель A
                    </Button>
                    <Button onClick={() => calculateDeterminant("B")}>
                      <Icon name="Hash" className="mr-2 h-4 w-4" />
                      Определитель B
                    </Button>
                    <Button onClick={() => calculateInverse("A")}>
                      <Icon name="FlipHorizontal" className="mr-2 h-4 w-4" />
                      Обратная матрица A⁻¹
                    </Button>
                    <Button onClick={() => calculateInverse("B")}>
                      <Icon name="FlipHorizontal" className="mr-2 h-4 w-4" />
                      Обратная матрица B⁻¹
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Результат</CardTitle>
              <CardDescription>
                {info || "Здесь будет показан результат операции"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200">
                  <AlertDescription>
                    <Icon name="AlertTriangle" className="inline-block mr-2 h-4 w-4" />
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              {resultScalar !== null && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md text-center">
                  <p className="text-2xl font-semibold">{resultScalar}</p>
                </div>
              )}
              
              {resultMatrix.length > 0 && (
                <div className="space-y-4">
                  <div className="p-2 border rounded-md overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {resultMatrix.map((row, rowIndex) => (
                          <tr key={`result-row-${rowIndex}`}>
                            {row.map((value, colIndex) => (
                              <td key={`result-${rowIndex}-${colIndex}`} className="p-1">
                                <div className="h-10 w-16 flex items-center justify-center border rounded-md bg-gray-50 dark:bg-gray-800">
                                  {Number.isInteger(value) ? value : value.toFixed(2)}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyResultTo("A")}
                    >
                      Копировать в A
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyResultTo("B")}
                    >
                      Копировать в B
                    </Button>
                  </div>
                </div>
              )}
              
              {!error && resultMatrix.length === 0 && resultScalar === null && (
                <div className="p-4 border border-dashed rounded-md text-center text-muted-foreground">
                  <p>Выберите операцию для получения результата</p>
                </div>
              )}
            </CardContent>
          </Card>
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

export default MatrixCalculator;
