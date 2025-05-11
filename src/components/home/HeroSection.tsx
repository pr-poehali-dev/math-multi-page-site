
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-24">
      <div className="absolute inset-0 bg-grid-primary/5 bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]"></div>
      <div className="container relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Изучайте{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              высшую математику
            </span>{" "}
            с удовольствием
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Доступные объяснения, интерактивные калькуляторы и тщательно подобранные примеры задач для глубокого понимания математических концепций
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/theory">
              <Button size="lg" className="h-12 px-8">
                Начать обучение
              </Button>
            </Link>
            <Link to="/calculators">
              <Button size="lg" variant="outline" className="h-12 px-8">
                Попробовать калькуляторы
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
