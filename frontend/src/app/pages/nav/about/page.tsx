import Image from 'next/image';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-16 px-4">
                <h1 className="text-4xl font-light mb-8 text-center text-text">About Tailor's Touch</h1>

                <section className="mb-16">
                    <h2 className="text-2xl font-light mb-4 text-text">Our Story</h2>
                    <div className="md:flex items-center">
                        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                            <Image
                                src="/placeholder.svg?height=400&width=600&text=Our+Story"
                                alt="Tailor's Touch story"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-primary mb-4">
                                Founded in 2010, Tailor's Touch began as a small boutique in the heart of the city. Our passion for quality craftsmanship and timeless style quickly earned us a loyal following.
                            </p>
                            <p className="text-primary">
                                Today, we're proud to offer our curated collection to fashion enthusiasts worldwide, maintaining our commitment to exceptional quality and personalized service.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-light mb-4 text-text">Our Mission</h2>
                    <p className="text-primary mb-4">
                        At Tailor's Touch, our mission is to provide our customers with clothing that not only looks great but feels great too. We believe that everyone deserves to feel confident and comfortable in what they wear.
                    </p>
                    <p className="text-primary">
                        We're committed to sustainable and ethical fashion practices, working closely with skilled artisans and using eco-friendly materials whenever possible.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-light mb-4 text-text">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Jane Doe", role: "Founder & Creative Director" },
                            { name: "John Smith", role: "Head of Design" },
                            { name: "Emily Johnson", role: "Customer Experience Manager" }
                        ].map((member, index) => (
                            <div key={index} className="text-center">
                                <Image
                                    src={`/placeholder.svg?height=200&width=200&text=${member.name}`}
                                    alt={member.name}
                                    width={200}
                                    height={200}
                                    className="rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-light text-text">{member.name}</h3>
                                <p className="text-primary">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-light mb-4 text-text">Visit Us</h2>
                    <div className="md:flex items-center">
                        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                            <Image
                                src="/placeholder.svg?height=400&width=600&text=Store+Location"
                                alt="Tailor's Touch store location"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-primary mb-4">
                                We'd love to welcome you to our flagship store. Experience our collection in person and receive personalized styling advice from our expert team.
                            </p>
                            <address className="text-primary not-italic">
                                123 Fashion Avenue<br />
                                Styleville, ST 12345<br />
                                United States
                            </address>
                            <p className="text-primary mt-4">
                                Open Monday to Saturday, 10am - 7pm
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

