'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { HeroCards } from '@/components/HeroCards';

export default function Home() {
  return (
    <>

      <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-26 max-w-full overflow-x-hidden overflow-y-hidden ">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#FCCF31]  to-[#F55555] text-transparent bg-clip-text">
                Anonymous
              </span>{" "}
              questions,
            </h1>{" "}
            for{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
                authentic
              </span>{" "}
              answers.
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            QBox makes collecting and managing questions effortless. Let people ask questions anonymously, skip the hassle of sign-ups and downloads.

          </p>
          <div className="shadow"></div>
        </div>
        <div className="order-1 lg:order-2 pt-10 z-10 pr-8">
          <HeroCards />
        </div>
      </section>

    <footer className="text-center p-4 mt-8 md:p-6">
      © 2024 Qbox, by <a href="https://sidonweb.com" className='underline font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500'>Siddharth</a>.
    </footer> 

    </>

  );
}
