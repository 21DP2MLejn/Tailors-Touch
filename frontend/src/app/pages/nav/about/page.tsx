import Image from 'next/image';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-16 px-4">
                <h1 className="text-4xl font-light mb-8 text-center text-text">About Tailor&#39;s Touch</h1>

                <section className="mb-16">
                    <h2 className="text-2xl font-light mb-4 text-text">Our Story</h2>
                    <div className="md:flex items-center">
                        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                            <Image
                                src="/Images/banner1.jpg"
                                alt="Tailor's Touch story"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-primary mb-4">
                                Founded in 2010, Tailor&#39;s Touch began as a small boutique in the heart of the city. Our passion for quality craftsmanship and timeless style quickly earned us a loyal following.
                            </p>
                            <p className="text-primary">
                                Today, we&#39;re proud to offer our curated collection to fashion enthusiasts worldwide, maintaining our commitment to exceptional quality and personalized service.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-light mb-4 text-text">Our Mission</h2>
                    <p className="text-primary mb-4">
                        At Tailor&#39;s Touch, our mission is to provide our customers with clothing that not only looks great but feels great too. We believe that everyone deserves to feel confident and comfortable in what they wear.
                    </p>
                    <p className="text-primary">
                        We&#39;re committed to sustainable and ethical fashion practices, working closely with skilled artisans and using eco-friendly materials whenever possible.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}

