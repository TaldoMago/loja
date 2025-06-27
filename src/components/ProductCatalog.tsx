import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Heart, Search, Sparkles, ShoppingCart } from 'lucide-react';
import './ProductCatalog.css'; 

// Tipos
interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  descricao: string;
}
//  Define a estrutura do contexto de favoritos que será compartilhado entre componentes.
interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
}
//Define as propriedades que o componente FavoritesProvider deve receber.

interface FavoritesProviderProps {
  children: ReactNode;
}
//Define as propriedades que cada card de produto deve receber.

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}
//Define as propriedades que o modal de detalhes do produto deve receber.

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

// cria um contexto que vai armazenar os dados dos favoritos, componente que vai "fornecer" os dados para todos os componentes filhos.

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleFavorite = (product: Product): void => {
    setFavorites(prev => 
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };
//Verifica se um produto específico está na lista de favoritos.

  const isFavorite = (id: number): boolean => favorites.some(p => p.id === id);

  //Disponibiliza os dados para todos os componentes filhos.

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
// Função que facilita o uso do contexto em outros componentes.
const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
};

// Dados dos produtos
const products: Product[] = [
  {
    id: 1,
    nome: "Teclado Gamer",
    categoria: "eletrônicos",
    preco: 149.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_822522-MLU72761438138_112023-O.webp",
    descricao: "Redragon Kumara LED Vermelho Lunar White Switch Azul"
  },
  {
    id: 2,
    nome: "Notebook Gamer",
    categoria: "eletrônicos", 
    preco: 4649.99,
    imagem: "https://m.media-amazon.com/images/I/51Wv-tEUn6L._AC_SX425_.jpg",
    descricao: "Notebook Acer Nitro V15 ANV15-51-58AZ 13ª Geração Intel Core i5-13420H, 8GB RAM, 512GB SSD, NVIDIA RTX 3050"
  },
  {
    id: 3,
    nome: "Tênis Air Force",
    categoria: "estilo",
    preco: 699.99,
    imagem: "https://imgnike-a.akamaihd.net/360x360/01113751A11.jpg",
    descricao: "Tênis Nike Air Force 1 07 Masculino"
  },
  {
    id: 4,
    nome: "Calca Baggy",
    categoria: "estilo",
    preco: 199.99,
    imagem: "https://img.joomcdn.net/7805c28f716f542bd7a900a50497d85eccfe3a9f_1024_1024.jpeg",
    descricao: "Calça Baggy em Jeans Maculino."
  },
  { 
    id: 5,
    nome: "Corrente Cravejada - ice",
    categoria: "acessorios",
    preco: 299.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_984412-MLB71959467867_092023-O-corrente-pingente-cravejado-gengar-ice-trap-funk-brilhante.webp",
    descricao: "Corrente Pingente Cravejado Gengar Ice Trap Brilhante."
  },
  {
    id: 6,
    nome: "Relógio Cravejado - ice",
    categoria: "acessorios",
    preco: 299.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_714776-MLB76842023081_062024-O-relogio-ice-masculino-cravejado-zircnia-vermelho-azul-verde.webp",
    descricao: "Relógio Ice Masculino Cravejado Zircônia Vermelho Azul Verde."

  },
  {
    id: 7,
    nome: "Camisa do Flamengo",
    categoria: "estilo",
    preco: 499.99,
    imagem: "https://acdn-us.mitiendanube.com/stores/002/322/390/products/camisa-flamengo-20001-e194b3b4ac4a78bb7717193606781979-1024-1024.jpeg",
    descricao: "Camisa Flamengo - 2000 Home(Maior do Brasil)."

  },
  {
      id: 8,
    nome: "Mouse Gamer",
    categoria: "eletrônicos",
    preco: 225.00,
    imagem: "https://images.kabum.com.br/produtos/fotos/102649/mouse-gamer-logitech-g403-hero-com-rgb-lightsync-6-botoes-programaveis-ajuste-de-peso-e-sensor-hero-25k-910-005631_1700850718_gg.jpg",
    descricao: "Mouse Gamer Logitech G403 HERO Sensor Hero 25K"
  },
{
     id: 9,
    nome: "Brinco Cravejado Masculino",
    categoria: "acessorios",
    preco: 199.99,
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUthrWTgfVFNRL6X_qrZif1ncXasrjBSveyw&s",
    descricao: "Brinco Masculino Argola Neymar Prata Cravejado Zirconia Banhado a ouro Branco"
}
  



];

// É um componente funcional tipado que recebe duas props e usa um hook customizado para gerenciar favoritos
const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.imagem} 
          alt={product.nome}
          className="product-image"
        />
        <button
          onClick={() => toggleFavorite(product)}
          className={`favorite-btn ${isFavorite(product.id) ? 'favorited' : 'not-favorited'}`}
        > 
          <Heart className={`favorite-icon ${isFavorite(product.id) ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.nome}</h3>
        <p className="product-description">{product.descricao}</p>
      </div>
      
      <div className="product-footer">
        <span className="product-price">
          R$ {product.preco.toFixed(2)}
        </span>
        <button
          onClick={() => onSelect(product)}
          className="view-more-btn"
        >
          Ver Mais
        </button>
      </div>
    </div>
  );
};

// Modal de detalhes
const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null; /*Se não há produto para exibir, não renderiza nada*/


  /*Cria o fundo escuro atrás do modal e impede que cliques dentro do modal o fechem*/
  return (
    <div className="modal-overlay" onClick={onClose}> 
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image-container">
          <img 
            src={product.imagem} 
            alt={product.nome}
            className="modal-image"
          />
        </div>
        <div className="modal-info">
          <h2 className="modal-title">{product.nome}</h2>
          <p className="modal-description">{product.descricao}</p>
          <p className="modal-price">
            R$ {product.preco.toFixed(2)}
          </p>
        </div>
        <div className="modal-actions">
          <button className="buy-btn">
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </button>
          <button onClick={onClose} className="close-btn">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const ProductCatalog: React.FC = () => {
  const [search, setSearch] = useState<string>(''); /*Armazena o texto da busca do usuário*/
  const [category, setCategory] = useState<string>('todas'); /*Categoria selecionada para filtrar produto*/
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); /*Produto selecionado */
  const [showFavorites, setShowFavorites] = useState<boolean>(false); /* Controla se está exibindo apenas favoritos ou todos os produtos*/
  
  const { favorites } = useFavorites(); /*para acessar produtos favoritos*/
  
  const categories: string[] = ['todas', 'eletrônicos', 'estilo', 'acessorios'];
/*Decide se usa lista de favoritos ou todos os produtos , Filtra por nome e categoria e retorna produtos que atendem ambos os critérios*/
  const filteredProducts: Product[] = (showFavorites ? favorites : products).filter(product => {
    const matchSearch = product.nome.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'todas' || product.categoria === category;
    return matchSearch && matchCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value); /*Atualiza o termo de busca*/
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCategory(e.target.value); /*Muda a categoria selecionada*/
  };

  const handleToggleFavorites = (): void => {
    setShowFavorites(!showFavorites); /*Alterna entre mostrar todos os produtos ou apenas favoritos*/
  };

  const handleCloseModal = (): void => {
    setSelectedProduct(null); /*Fecha o modal do produto*/
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <Sparkles className="logo-icon" />
            <h1 className="logo-text">TALDO MAGO STORE</h1>
          </div>
          
          <div className="search-controls">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            
            <select
              value={category}
              onChange={handleCategoryChange}
              className="category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'todas' ? 'Todas Categorias' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleToggleFavorites}
            className={`favorites-btn ${showFavorites ? 'active' : 'inactive'}`}
          >
            {showFavorites ? 'Ver Todos' : `Favoritos (${favorites.length})`}
          </button>
        </div>
      </header>

      {/* Produtos */}
      <main className="main-content">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p className="no-products-text">
              {showFavorites ? 'Nenhum favorito encontrado' : 'Nenhum produto encontrado'}
            </p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

// Componente que será exportado com Provider
const ProductCatalogWithProvider: React.FC = () => (
  <FavoritesProvider>
    <ProductCatalog />
  </FavoritesProvider>
);

export default ProductCatalogWithProvider;