import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin, Mail } from "lucide-react";
// import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

export const HeroCards = () => {
    return (
        <div className="hidden md:flex flex-grow flex-row relative w-[600px] h-[450px]">
            {/* Testimonial */}
            <Carousel
                plugins={[Autoplay({ delay: 4000 })]}
                className="w-[300px] -top-[10px] drop-shadow-xl shadow-black/10 dark:shadow-white/10"
            >
                <CarouselContent>
                    {messages.map((message, index) => (
                        <CarouselItem key={index}>

                            <Card className="">
                                <CardHeader className="flex flex-row items-center gap-3 pb-1">
                                    <Avatar>

                                        <AvatarImage
                                            alt=""
                                            src={message.pfp}
                                        />
                                        <AvatarFallback>AF</AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col">
                                        <CardTitle className="text-md">{message.title}</CardTitle>
                                        <CardDescription>{message.received}</CardDescription>
                                    </div>
                                </CardHeader>

                                <CardContent>{message.content}</CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>

            {/* Team */}
            <Card className=" right-[15px] top-4 w-3/4 h-2/4 ml-4 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="mt-6 flex justify-center items-center pb-1">
                    <img
                        src="https://www.sidonweb.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fselfpotrait.5c76b7bd.jpg&w=384&q=75"
                        alt="user avatar"
                        className="absolute grayscale-[0%] -top-10 rounded-full w-20 h-20 aspect-square object-cover"
                    />
                    <CardTitle className="text-center">Siddharth Singh</CardTitle>
                    <CardDescription className="font-normal text-primary">
                        Full-Stack Developer
                    </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-1">
                    <p>
                        I really enjoy transforming ideas into functional software that
                        exceeds expectations.
                    </p>
                </CardContent>

                <CardFooter>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="https://github.com/sidonweb"
                            target="_blank"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            <span className="sr-only">Github icon</span>
                            <GitHubLogoIcon className="w-5 h-5" />
                        </a>
                        <a
                            rel="noreferrer noopener"
                            href="https://twitter.com/siddonweb"
                            target="_blank"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            <span className="sr-only">X icon</span>
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-foreground w-5 h-5"
                            >
                                <title>X</title>
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                            </svg>
                        </a>

                        <a
                            rel="noreferrer noopener"
                            href="https://www.linkedin.com/in/sidonweb/"
                            target="_blank"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            <span className="sr-only">Linkedin icon</span>
                            <Linkedin size="20" />
                        </a>
                    </div>
                </CardFooter>
            </Card>

            {/* Pricing */}
            <Card className="absolute top-[130px] left-[40px] w-64 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                    <CardTitle className="flex item-center justify-between">
                        Free
                        <Badge
                            variant="secondary"
                            className="text-sm text-primary"
                        >
                            Most popular
                        </Badge>
                    </CardTitle>
                    <div>
                        <span className="text-2xl font-bold">$0</span>
                        <span className="text-muted-foreground"> /month</span>
                    </div>

                    <CardDescription>
                        Enjoy all our features at no cost to you.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button className="w-full">Get started</Button>
                </CardContent>
            </Card>
        </div>
    );
};
