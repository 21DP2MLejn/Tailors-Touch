import Image from 'next/image';
import Link from 'next/link';
import Navbar from "./components/navbar";
import Footer from './components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Fashion collection showcase"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-light mb-4">Welcome to Tailor's Touch</h1>
            <p className="text-xl md:text-2xl mb-8">Discover Your Perfect Style</p>
            <Link href="/pages/nav/products" className="bg-white text-gray-900 py-2 px-6 rounded-md hover:bg-gray-100 transition duration-300">
              Shop Now
            </Link>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 px-4">
          <h2 className="text-3xl font-light text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Women', 'Men', 'Accessories'].map((category) => (
              <div key={category} className="relative h-64 group overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=400&width=300&text=${category}`}
                  alt={`${category} category`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-light">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 px-4 bg-white">
          <h2 className="text-3xl font-light text-center mb-12">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group">
                <div className="relative aspect-w-1 aspect-h-1 mb-4">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Product ${item}`}
                    alt={`Product ${item}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-light mb-2">Product Name</h3>
                <p className="text-gray-600">$99.99</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6">About Tailor's Touch</h2>
            <p className="text-gray-600 mb-8">
              At Tailor's Touch, we believe that fashion is a form of self-expression. Our curated collection 
              of high-quality, stylish pieces is designed to help you showcase your unique personality. 
              From casual wear to elegant evening attire, we have something for every occasion.
            </p>
            <Link href="/about" className="text-gray-900 border border-gray-900 py-2 px-6 rounded-md hover:bg-gray-100 transition duration-300">
              Learn More
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for the latest updates, exclusive offers, and style tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

