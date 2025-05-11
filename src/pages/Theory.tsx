
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Theory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Теоретические материалы</h1>
        
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
                <CardTitle className="text-2xl">Линейная алгебра</CardTitle>
                <CardDescription>
                  Основы векторных пространств, матричных операций и линейных преобразований
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4">Разделы линейной алгебры</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: "Матрицы и определители", icon: "Table" },
                    { title: "Системы линейных уравнений", icon: "AlignRight" },
                    { title: "Векторные пространства", icon: "ArrowRight" },
                    { title: "Линейные операторы", icon: "PenTool" },
                    { title: "Собственные значения и векторы", icon: "Vector" },
                    { title: "Квадратичные формы", icon: "Square" }
                  ].map((item, index) => (
                    <Link to={`/theory/algebra/${item.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                      <div className="border rounded-lg p-4 hover:bg-primary/5 hover:border-primary transition">
                        <div className="flex items-center gap-3">
                          <Icon name={item.icon} className="h-5 w-5 text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Separator className="my-8" />
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Матрицы и определители</h3>
                  
                  <div className="prose max-w-none dark:prose-invert">
                    <p>
                      Матрицы представляют собой прямоугольные таблицы чисел. Они играют важную роль в линейной алгебре, 
                      позволяя компактно представлять и решать системы линейных уравнений, а также описывать линейные преобразования.
                    </p>
                    
                    <h4>Определение матрицы</h4>
                    <p>
                      Матрица размера m×n (читается "m на n") — это прямоугольная таблица чисел, содержащая m строк и n столбцов. 
                      Обычно матрицы обозначаются заглавными латинскими буквами (A, B, C). Элементы матрицы обозначаются 
                      соответствующей строчной буквой с двумя индексами: a<sub>ij</sub> — элемент, стоящий в i-й строке и j-м столбце матрицы A.
                    </p>
                    
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                      <p className="text-center">
                        A = 
                        <span className="mx-2">
                          ⎛ a<sub>11</sub> a<sub>12</sub> ... a<sub>1n</sub> ⎞<br />
                          ⎜ a<sub>21</sub> a<sub>22</sub> ... a<sub>2n</sub> ⎟<br />
                          ⎜ ... ... ... ... ⎟<br />
                          ⎝ a<sub>m1</sub> a<sub>m2</sub> ... a<sub>mn</sub> ⎠
                        </span>
                      </p>
                    </div>
                    
                    <h4>Основные виды матриц</h4>
                    <ul>
                      <li><strong>Квадратная матрица</strong> — матрица, у которой число строк равно числу столбцов (m = n).</li>
                      <li><strong>Диагональная матрица</strong> — квадратная матрица, у которой все элементы вне главной диагонали равны нулю.</li>
                      <li><strong>Единичная матрица</strong> — диагональная матрица, у которой все элементы на главной диагонали равны единице.</li>
                      <li><strong>Нулевая матрица</strong> — матрица, все элементы которой равны нулю.</li>
                      <li><strong>Треугольная матрица</strong> — квадратная матрица, у которой все элементы либо выше, либо ниже главной диагонали равны нулю.</li>
                    </ul>
                    
                    <h4>Операции над матрицами</h4>
                    <p>
                      С матрицами можно выполнять различные операции, включая сложение, умножение на скаляр и умножение матриц.
                    </p>
                    
                    <p>
                      <strong>Сложение матриц:</strong> Две матрицы одинакового размера можно сложить, складывая их соответствующие элементы.
                    </p>
                    
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                      <p>
                        Если A и B — матрицы размера m×n, то их сумма C = A + B также имеет размер m×n, и c<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub>
                      </p>
                    </div>
                    
                    <p><a href="/theory/algebra/matrices-determinants" className="text-primary hover:underline">Читать подробнее о матрицах и определителях...</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calculus" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Математический анализ</CardTitle>
                <CardDescription>
                  Изучение функций, пределов, производных и интегралов для понимания непрерывных изменений
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4">Разделы математического анализа</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: "Пределы и непрерывность", icon: "ArrowRightLeft" },
                    { title: "Производные", icon: "LineChart" },
                    { title: "Интегралы", icon: "AreaChart" },
                    { title: "Ряды", icon: "ListOrdered" },
                    { title: "Дифференциальное исчисление многих переменных", icon: "Combine" },
                    { title: "Кратные интегралы", icon: "Box" }
                  ].map((item, index) => (
                    <Link to={`/theory/calculus/${item.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                      <div className="border rounded-lg p-4 hover:bg-primary/5 hover:border-primary transition">
                        <div className="flex items-center gap-3">
                          <Icon name={item.icon} className="h-5 w-5 text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Separator className="my-8" />
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Пределы и непрерывность</h3>
                  
                  <div className="prose max-w-none dark:prose-invert">
                    <p>
                      Понятие предела является фундаментальным в математическом анализе. Оно позволяет строго определить 
                      такие понятия как непрерывность, производная и интеграл.
                    </p>
                    
                    <h4>Определение предела функции</h4>
                    <p>
                      Говорят, что функция f(x) имеет предел L при x, стремящемся к a (записывается lim f(x) = L), 
                      если для любого положительного числа ε существует такое положительное число δ, что для всех x, 
                      удовлетворяющих условию 0 &lt; |x - a| &lt; δ, выполняется неравенство |f(x) - L| &lt; ε.
                    </p>
                    
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                      <p className="text-center">
                        lim<sub>x→a</sub> f(x) = L ⟺ ∀ε &gt; 0 ∃δ &gt; 0: ∀x (0 &lt; |x - a| &lt; δ ⟹ |f(x) - L| &lt; ε)
                      </p>
                    </div>
                    
                    <h4>Основные свойства пределов</h4>
                    <p>
                      Если существуют пределы функций f(x) и g(x) при x, стремящемся к a, то:
                    </p>
                    <ol>
                      <li>lim<sub>x→a</sub> [f(x) + g(x)] = lim<sub>x→a</sub> f(x) + lim<sub>x→a</sub> g(x)</li>
                      <li>lim<sub>x→a</sub> [f(x) · g(x)] = lim<sub>x→a</sub> f(x) · lim<sub>x→a</sub> g(x)</li>
                      <li>lim<sub>x→a</sub> [f(x) / g(x)] = lim<sub>x→a</sub> f(x) / lim<sub>x→a</sub> g(x), если lim<sub>x→a</sub> g(x) ≠ 0</li>
                    </ol>
                    
                    <p><a href="/theory/calculus/limits-continuity" className="text-primary hover:underline">Читать подробнее о пределах и непрерывности...</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="diff-eq">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Дифференциальные уравнения</CardTitle>
                <CardDescription>
                  Уравнения, содержащие производные неизвестных функций
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Содержание этого раздела в разработке. Скоро здесь появятся подробные материалы.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="probability">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Теория вероятностей</CardTitle>
                <CardDescription>
                  Изучение случайных явлений и их закономерностей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Содержание этого раздела в разработке. Скоро здесь появятся подробные материалы.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-gray-900 text-white py-8">
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

export default Theory;
