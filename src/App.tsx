import { useTheme } from './theme';
import { CATEGORIES } from './catalog';
import { PRODUCTS } from './data/products';
import Nav from './components/Nav';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Nav theme={theme} onToggle={toggle} />
      <main id="top">
        <Hero />
        {CATEGORIES.map((cat) => (
          <CategorySection
            key={cat.id}
            category={cat}
            products={PRODUCTS.filter((p) => p.category === cat.id)}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}