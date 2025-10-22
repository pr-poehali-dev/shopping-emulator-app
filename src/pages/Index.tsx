import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import VideoPlayer from '@/components/VideoPlayer';

interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  image: string;
  quality: string[];
  featured?: boolean;
}

const MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Midnight Pursuit',
    genre: 'Боевик',
    year: 2024,
    rating: 8.7,
    image: 'https://cdn.poehali.dev/projects/dde84e5b-4dc2-47c3-9220-166f6bcfcefb/files/26a51620-c060-487c-81d3-b16464d81caa.jpg',
    quality: ['4K', 'HD', 'SD'],
    featured: true,
  },
  {
    id: 2,
    title: 'Neon Horizons',
    genre: 'Научная фантастика',
    year: 2024,
    rating: 9.1,
    image: 'https://cdn.poehali.dev/projects/dde84e5b-4dc2-47c3-9220-166f6bcfcefb/files/e78447f5-9189-48f2-a172-fc2b6be68035.jpg',
    quality: ['4K', 'HD', 'SD'],
  },
  {
    id: 3,
    title: 'Whispers of Tomorrow',
    genre: 'Драма',
    year: 2023,
    rating: 8.3,
    image: 'https://cdn.poehali.dev/projects/dde84e5b-4dc2-47c3-9220-166f6bcfcefb/files/3da745f1-4446-40f9-b741-05822584b33c.jpg',
    quality: ['HD', 'SD'],
  },
];

const Index = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'catalog' | 'subscriptions' | 'search' | 'profile' | 'favorites'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);

  const featuredMovie = MOVIES.find(m => m.featured);

  const toggleFavorite = (movieId: number) => {
    setFavorites(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const filteredMovies = searchQuery 
    ? MOVIES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : MOVIES;

  const favoriteMovies = MOVIES.filter(m => favorites.includes(m.id));

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">STREAMIFY</h1>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setCurrentTab('home')}
              className={`text-sm font-medium transition-colors ${currentTab === 'home' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Главная
            </button>
            <button 
              onClick={() => setCurrentTab('catalog')}
              className={`text-sm font-medium transition-colors ${currentTab === 'catalog' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Каталог
            </button>
            <button 
              onClick={() => setCurrentTab('subscriptions')}
              className={`text-sm font-medium transition-colors ${currentTab === 'subscriptions' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Подписки
            </button>
            <button 
              onClick={() => setCurrentTab('search')}
              className={`text-sm font-medium transition-colors ${currentTab === 'search' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Поиск
            </button>
            <button 
              onClick={() => setCurrentTab('favorites')}
              className={`text-sm font-medium transition-colors ${currentTab === 'favorites' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Избранное
            </button>
            <button 
              onClick={() => setCurrentTab('profile')}
              className={`p-2 rounded-full hover:bg-accent transition-colors ${currentTab === 'profile' ? 'bg-accent' : ''}`}
            >
              <Icon name="User" size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {currentTab === 'home' && (
          <div className="animate-fade-in">
            {featuredMovie && (
              <div className="relative h-[70vh] overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${featuredMovie.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
                
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-20">
                  <h2 className="text-6xl font-bold mb-4">{featuredMovie.title}</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <Badge variant="secondary" className="text-sm">
                      <Icon name="Star" size={14} className="mr-1 fill-yellow-500 text-yellow-500" />
                      {featuredMovie.rating}
                    </Badge>
                    <span className="text-muted-foreground">{featuredMovie.year}</span>
                    <Badge>{featuredMovie.genre}</Badge>
                    <div className="flex gap-2">
                      {featuredMovie.quality.map(q => (
                        <Badge key={q} variant="outline" className="border-primary text-primary">{q}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setPlayingMovie(featuredMovie)}
                    >
                      <Icon name="Play" size={20} className="mr-2" />
                      Смотреть
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => toggleFavorite(featuredMovie.id)}
                    >
                      <Icon 
                        name={favorites.includes(featuredMovie.id) ? "Heart" : "Heart"} 
                        size={20} 
                        className={favorites.includes(featuredMovie.id) ? "fill-primary text-primary" : ""}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="container mx-auto px-6 py-12">
              <h3 className="text-2xl font-bold mb-6">Популярное сейчас</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOVIES.map(movie => (
                  <Card 
                    key={movie.id} 
                    className="group overflow-hidden bg-card hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={movie.image} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(movie.id);
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={18} 
                            className={favorites.includes(movie.id) ? "fill-primary text-primary" : ""}
                          />
                        </Button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <h4 className="text-xl font-bold mb-2 text-white">{movie.title}</h4>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            <Icon name="Star" size={12} className="mr-1 fill-yellow-500 text-yellow-500" />
                            {movie.rating}
                          </Badge>
                          <span className="text-sm text-gray-300">{movie.year}</span>
                        </div>
                        <div className="flex gap-2 mb-3">
                          {movie.quality.map(q => (
                            <Badge key={q} variant="outline" className="border-primary text-primary text-xs">{q}</Badge>
                          ))}
                        </div>
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingMovie(movie);
                          }}
                        >
                          <Icon name="Play" size={16} className="mr-2" />
                          Смотреть
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'catalog' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Каталог</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOVIES.map(movie => (
                <Card key={movie.id} className="group overflow-hidden bg-card hover:scale-105 transition-transform cursor-pointer">
                  <div className="relative aspect-[2/3]">
                    <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        className="bg-primary"
                        onClick={() => setPlayingMovie(movie)}
                      >
                        <Icon name="Play" size={20} className="mr-2" />
                        Смотреть
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-2">{movie.title}</h4>
                    <p className="text-sm text-muted-foreground">{movie.genre} • {movie.year}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'search' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Поиск</h2>
            <div className="max-w-2xl mb-12">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Найти фильм или сериал..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg"
                />
              </div>
            </div>
            
            {searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                  <Card key={movie.id} className="overflow-hidden bg-card hover:scale-105 transition-transform cursor-pointer">
                    <div className="relative aspect-[2/3]">
                      <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold">{movie.title}</h4>
                      <p className="text-sm text-muted-foreground">{movie.genre}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {currentTab === 'subscriptions' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Подписки</h2>
            
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/20 to-background border-primary/30 p-8">
              <div className="text-center mb-8">
                <Icon name="Crown" size={64} className="mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">Premium подписка</h3>
                <p className="text-muted-foreground">Безлимитный доступ к контенту в максимальном качестве</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">4K качество</p>
                    <p className="text-sm text-muted-foreground">Адаптивное качество от SD до 4K</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Без рекламы</p>
                    <p className="text-sm text-muted-foreground">Наслаждайтесь просмотром без прерываний</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Эксклюзивный контент</p>
                    <p className="text-sm text-muted-foreground">Доступ к премиум фильмам и сериалам</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">4 устройства одновременно</p>
                    <p className="text-sm text-muted-foreground">Смотрите на всех ваших устройствах</p>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary mb-2">999₽</div>
                <p className="text-muted-foreground">за год подписки</p>
              </div>

              <Button 
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90"
                onClick={() => setHasSubscription(true)}
              >
                {hasSubscription ? (
                  <>
                    <Icon name="CheckCircle" size={20} className="mr-2" />
                    Подписка активна
                  </>
                ) : (
                  'Оформить подписку'
                )}
              </Button>
            </Card>
          </div>
        )}

        {currentTab === 'favorites' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Избранное</h2>
            
            {favoriteMovies.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">Пока нет избранных фильмов</p>
                <p className="text-muted-foreground mt-2">Добавьте фильмы в избранное, чтобы быстро находить их</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteMovies.map(movie => (
                  <Card key={movie.id} className="overflow-hidden bg-card hover:scale-105 transition-transform cursor-pointer">
                    <div className="relative aspect-[2/3]">
                      <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-4 right-4"
                        onClick={() => toggleFavorite(movie.id)}
                      >
                        <Icon name="Heart" size={18} className="fill-primary text-primary" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold">{movie.title}</h4>
                      <p className="text-sm text-muted-foreground">{movie.genre}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {currentTab === 'profile' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Профиль</h2>
            
            <Card className="max-w-2xl mx-auto p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Пользователь</h3>
                  <p className="text-muted-foreground">user@example.com</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-semibold">Статус подписки</p>
                    <p className="text-sm text-muted-foreground">
                      {hasSubscription ? 'Premium активна до 22.10.2026' : 'Нет активной подписки'}
                    </p>
                  </div>
                  <Badge variant={hasSubscription ? "default" : "secondary"}>
                    {hasSubscription ? 'Premium' : 'Free'}
                  </Badge>
                </div>

                <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-semibold">Избранное</p>
                    <p className="text-sm text-muted-foreground">{favorites.length} фильмов</p>
                  </div>
                  <Icon name="Heart" size={20} className="text-primary" />
                </div>

                <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-semibold">Качество по умолчанию</p>
                    <p className="text-sm text-muted-foreground">Автоматическое (до 4K)</p>
                  </div>
                  <Icon name="Settings" size={20} className="text-muted-foreground" />
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {playingMovie && (
        <VideoPlayer 
          title={playingMovie.title}
          onClose={() => setPlayingMovie(null)}
        />
      )}
    </div>
  );
};

export default Index;