
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Tasks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Практические задачи</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Закрепите теоретические знания с помощью решения задач различной сложности
        </p>
        
        <Tabs defaultValue="algebra" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-auto">
            <TabsTrigger value="algebra">Линейная алгебра</TabsTrigger>
            <TabsTrigger value="calculus">Математический анализ</TabsTrigger>
            <TabsTrigger value="diff-eq">Дифференциальные уравнения</TabsTrigger>
            <TabsTrigger value="probability">Теория вероятностей</TabsTrigger>
          </TabsList>
          
          <TabsContent value="algebra" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Задачи по линейной алгебре</CardTitle>
                <CardDescription>
                  Практические задания по матрицам, определителям и системам линейных уравнений
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Задача 1: Операции с матрицами</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                      <p className="mb-2">Даны матрицы:</p>
                      <div className="mb-2">
                        <p>A = [
                          <span className="inline-block mx-1">
                            2 1 3<br />
                            0 -1 4<br />
                            5 2 1
                          </span>
                        ]</p>
                      </div>
                      <div className="mb-4">
                        <p>B = [
                          <span className="inline-block mx-1">
                            1 0 2<br />
                            3 -2 1<br />
                            4 1 -3
                          </span>
                        ]</p>
                      </div>
                      <p className="font-medium">Найдите:</p>
                      <ol className="list-decimal list-inside space-y-1 mt-2">
                        <li>A + B</li>
                        <li>A · B</li>
                        <li>det(A)</li>
                        <li>A⁻¹</li>
                      </ol>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4 mt-4">
                      <h4 className="font-medium mb-2">Решение:</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="mb-1">1. Найдем A + B</p>
                          <p>A + B = [
                            <span className="inline-block mx-1">
                              2+1 1+0 3+2<br />
                              0+3 -1+(-2) 4+1<br />
                              5+4 2+1 1+(-3)
                            </span>
                          ] = [
                            <span className="inline-block mx-1">
                              3 1 5<br />
                              3 -3 5<br />
                              9 3 -2
                            </span>
                          ]</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">2. Найдем A · B (умножение матриц)</p>
                          <p>A · B = [
                            <span className="inline-block mx-1">
                              2·1+1·3+3·4 2·0+1·(-2)+3·1 2·2+1·1+3·(-3)<br />
                              0·1+(-1)·3+4·4 0·0+(-1)·(-2)+4·1 0·2+(-1)·1+4·(-3)<br />
                              5·1+2·3+1·4 5·0+2·(-2)+1·1 5·2+2·1+1·(-3)
                            </span>
                          ] = [
                            <span className="inline-block mx-1">
                              19 1 -5<br />
                              13 6 -13<br />
                              15 -3 8
                            </span>
                          ]</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">3. Найдем det(A)</p>
                          <p>det(A) = 2·(-1)·1 + 1·4·5 + 3·0·2 - 5·(-1)·3 - 2·4·2 - 1·0·1 = -2 + 20 + 0 + 15 - 16 - 0 = 17</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">4. Найдем A⁻¹</p>
                          <p>Сначала найдем матрицу алгебраических дополнений:</p>
                          <p>A* = [
                            <span className="inline-block mx-1">
                              (-1·1-4·2) (-0·1-4·5) (0·2-(-1)·5)<br />
                              (1·5-3·2) (2·5-3·0) (2·0-1·5)<br />
                              (1·4-3·(-1)) (2·4-3·1) (2·(-1)-1·0)
                            </span>
                          ] = [
                            <span className="inline-block mx-1">
                              -9 -20 5<br />
                              -1 10 -10<br />
                              7 5 -2
                            </span>
                          ]</p>
                          <p>Транспонируем её: (A*)ᵀ = [
                            <span className="inline-block mx-1">
                              -9 -1 7<br />
                              -20 10 5<br />
                              5 -10 -2
                            </span>
                          ]</p>
                          <p>Наконец, A⁻¹ = (A*)ᵀ / det(A) = [
                            <span className="inline-block mx-1">
                              -9/17 -1/17 7/17<br />
                              -20/17 10/17 5/17<br />
                              5/17 -10/17 -2/17
                            </span>
                          ]</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Задача 2: Системы линейных уравнений</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                      <p className="mb-2">Решите систему линейных уравнений методом Крамера:</p>
                      <div className="mb-4">
                        <p>
                          2x + y - z = 8<br />
                          x - 3y + 2z = -1<br />
                          3x + 2y + z = 10
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4 mt-4">
                      <h4 className="font-medium mb-2">Решение:</h4>
                      <p>Метод Крамера применим, когда определитель основной матрицы системы не равен нулю.</p>
                      <div className="space-y-4 mt-2">
                        <div>
                          <p className="mb-1">Составим основную матрицу системы:</p>
                          <p>A = [
                            <span className="inline-block mx-1">
                              2 1 -1<br />
                              1 -3 2<br />
                              3 2 1
                            </span>
                          ]</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">Найдем определитель матрицы A:</p>
                          <p>det(A) = 2·(-3)·1 + 1·2·3 + (-1)·1·2 - 3·(-3)·(-1) - 2·2·2 - 1·1·(-3) = -6 + 6 - 2 - 9 - 8 + 3 = -16</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">Определитель не равен нулю, поэтому метод Крамера применим.</p>
                          <p>Заменим первый столбец матрицы A на столбец свободных членов:</p>
                          <p>A₁ = [
                            <span className="inline-block mx-1">
                              8 1 -1<br />
                              -1 -3 2<br />
                              10 2 1
                            </span>
                          ]</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">Найдем det(A₁):</p>
                          <p>det(A₁) = 8·(-3)·1 + 1·2·10 + (-1)·(-1)·2 - 10·(-3)·(-1) - 2·2·8 - 1·(-1)·(-3) = -24 + 20 + 2 - 30 - 32 - 3 = -67</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">Заменим второй столбец матрицы A на столбец свободных членов:</p>
                          <p>A₂ = [
                            <span className="inline-block mx-1">
                              2 8 -1<br />
                              1 -1 2<br />
                              3 10 1
                            </span>
                          ]</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">Найдем det(A₂):</p>
                          <p>det(A₂) = 2·(-1)·1 + 8·2·3 + (-1)·1·10 - 3·(-1)·(-1) - 10·2·2 - 1·1·8 = -2 + 48 - 10 - 3 - 40 - 8 = -15</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">Заменим третий столбец матрицы A на столбец свободных членов:</p>
                          <p>A₃ = [
                            <span className="inline-block mx-1">
                              2 1 8<br />
                              1 -3 -1<br />
                              3 2 10
                            </span>
                          ]</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">Найдем det(A₃):</p>
                          <p>det(A₃) = 2·(-3)·10 + 1·(-1)·3 + 8·1·2 - 3·(-3)·8 - 2·(-1)·2 - 10·1·1 = -60 - 3 + 16 - 72 + 4 - 10 = -125</p>
                        </div>
                        
                        <div>
                          <p className="mb-1">Теперь найдем значения переменных:</p>
                          <p>x = det(A₁)/det(A) = -67/(-16) = 4.1875 ≈ 4.19</p>
                          <p>y = det(A₂)/det(A) = -15/(-16) = 0.9375 ≈ 0.94</p>
                          <p>z = det(A₃)/det(A) = -125/(-16) = 7.8125 ≈ 7.81</p>
                        </div>
                        
                        <div>
                          <p className="font-medium">Ответ: x ≈ 4.19, y ≈ 0.94, z ≈ 7.81</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/tasks/algebra" className="text-primary hover:underline">Смотреть больше задач по линейной алгебре...</Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calculus" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Задачи по математическому анализу</CardTitle>
                <CardDescription>
                  Практические задания по пределам, производным и интегралам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Задача 1: Вычисление пределов</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                      <p className="mb-2">Вычислите следующий предел:</p>
                      <div className="mb-4 text-center">
                        <p className="text-lg">lim<sub>x→0</sub> (sin(3x) / x)</p>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4 mt-4">
                      <h4 className="font-medium mb-2">Решение:</h4>
                      <div className="space-y-2">
                        <p>Воспользуемся известным пределом: lim<sub>x→0</sub> (sin(x) / x) = 1</p>
                        <p>Преобразуем наш предел:</p>
                        <p>lim<sub>x→0</sub> (sin(3x) / x) = lim<sub>x→0</sub> (sin(3x) / 3x · 3) = 3 · lim<sub>x→0</sub> (sin(3x) / 3x)</p>
                        <p>Сделаем замену переменной: t = 3x, тогда при x→0 имеем t→0</p>
                        <p>3 · lim<sub>t→0</sub> (sin(t) / t) = 3 · 1 = 3</p>
                        <p className="font-medium mt-2">Ответ: 3</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Задача 2: Производные</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                      <p className="mb-2">Найдите производную функции:</p>
                      <div className="mb-4 text-center">
                        <p className="text-lg">f(x) = (x² + 1)e<sup>-x</sup></p>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4 mt-4">
                      <h4 className="font-medium mb-2">Решение:</h4>
                      <div className="space-y-2">
                        <p>Воспользуемся правилом дифференцирования произведения функций:</p>
                        <p>(u·v)' = u'·v + u·v'</p>
                        <p>Пусть u = x² + 1, тогда u' = 2x</p>
                        <p>v = e<sup>-x</sup>, тогда v' = -e<sup>-x</sup></p>
                        <p>f'(x) = 2x·e<sup>-x</sup> + (x² + 1)·(-e<sup>-x</sup>) = 2x·e<sup>-x</sup> - (x² + 1)·e<sup>-x</sup> = e<sup>-x</sup>(2x - x² - 1) = e<sup>-x</sup>(2x - x² - 1)</p>
                        <p>Упростим выражение в скобках: 2x - x² - 1 = -x² + 2x - 1 = -(x² - 2x + 1) = -(x-1)²</p>
                        <p>f'(x) = -e<sup>-x</sup>(x-1)²</p>
                        <p className="font-medium mt-2">Ответ: f'(x) = -e<sup>-x</sup>(x-1)²</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/tasks/calculus" className="text-primary hover:underline">Смотреть больше задач по математическому анализу...</Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="diff-eq">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Задачи по дифференциальным уравнениям</CardTitle>
                <CardDescription>
                  Практические задания по решению различных типов дифференциальных уравнений
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Раздел в разработке. Скоро здесь появятся задачи по дифференциальным уравнениям.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="probability">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Задачи по теории вероятностей</CardTitle>
                <CardDescription>
                  Практические задания по вероятностям событий, случайным величинам и статистике
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Раздел в разработке. Скоро здесь появятся задачи по теории вероятностей.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

export default Tasks;
