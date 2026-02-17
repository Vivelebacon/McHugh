export function AboutSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-100/50 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
            The Artist
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">About Joe</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full" />
        </div>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <figure className="my-10">
            <img
              src="/images/joe-brian-painting-bus.png"
              alt="Brian Hand and Joe McHugh painting the bus"
              className="w-full rounded-2xl shadow-lg object-cover max-h-[420px]"
            />
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              Brian Hand and Joe McHugh painting the bus.
            </figcaption>
          </figure>

          <p className="text-xl leading-relaxed">
            Joe McHugh (1939 – 2022) was an artist, a seeker, and a master at playing with perception. 
            Trained at Lehigh University and the Rhode Island School of Design, he combined the hand of 
            an artist with the curiosity of a mystic.
          </p>
          
          <p>
            As a schoolboy, he was once chided by an art teacher for drawing a purple tree—an early sign 
            that his imagination was wired for worlds beyond the ordinary. From an early age, Joe was 
            already seeing through the cracks of consensus reality.
          </p>
          
          <p>
            In 1964, while serving in the U.S. Army at Fort Knox, McHugh met psychologist Bob Hall, 
            who introduced him to the newly emerging world consciousness research and LSD when it was 
            still legal. McHugh's imagination and intellect were sparked, and what emerged were hundreds 
            of sketchbook drawings, collages, paintings, photographs, posters, folded origami, light 
            experiments and slide shows—each an attempt to translate the metaphysical into the physical 
            and back again.
          </p>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 my-12">
            <h2 className="font-serif text-3xl text-[#1A1A1A] mb-4">Flapping Your Arms Can Be Flying</h2>
            <img
              src="/images/flapping-your-arms-cover.png"
              alt="Book cover of Flapping Your Arms Can Be Flying with electric green background and red text"
              className="w-full max-w-sm mx-auto rounded-xl shadow-md mb-6 object-cover"
            />
            <p>
              Flapping Your Arms Can Be Flying began in Joe McHugh's Army sketchbooks, just after he and 
              his sergeant and army psychiatrist, Bob Hall, discovered LSD at Fort Knox in 1964 while it 
              was still legal.
            </p>
            <p className="mt-4">
              First published in San Francisco in 1966, just before the Summer of Love, it helped launch 
              the movement. With favorable reviews from Ken Kesey, it was an immediate success, laying the 
              groundwork for East Totem West, a visionary publishing company dedicated to producing 
              high-quality, affordable psychedelic art.
            </p>
            <p className="mt-4 text-purple-600 font-medium">
              The book became part of the Victoria and Albert Museum's permanent collection in the late 1990s.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 my-12">
            <h2 className="font-serif text-3xl text-[#1A1A1A] mb-4">About <em>The Other Cat</em> Notebook</h2>
            <img
              src="/images/other-cat-notebook.png"
              alt="The Other Cat, from The Other Cat notebook, painted by Joe McHugh in the 1960s"
              className="w-full max-w-sm mx-auto rounded-xl shadow-md mb-6 object-cover"
            />
            <p>
              Well before Joe McHugh's psychedelic visions took flight, there was this small notebook. On page 16 
              leaps <em>The Other Cat</em>—a blue-striped, wide-eyed creature in full color. It's as if Joe's inner 
              world suddenly pawed its way onto the page. The image got its name years later from Joe's wife, Jan, 
              who adored it. This t-shirt marks <em>The Other Cat</em>'s world debut.
            </p>
          </div>
          
          <p>
            McHugh's home was a salon for musicians, poets, and philosophers who gathered to discuss 
            art, the I Ching, karma, and football late into the night. He was as likely to perform a 
            card trick as to quote Gurdjieff, as fascinated by the geometry of a mandala as by the 
            geometry of a perfect golf swing.
          </p>
          
          <p className="text-xl text-purple-600 font-medium text-center py-8">
            "To fly, all you need to do is flap your arms."
          </p>
          
          <p>
            In all his work, Joe McHugh remained what he had been from the start—a visual philosopher, 
            reminding us that revelation can hide in plain sight, and that sometimes, to fly, all you 
            need to do is flap your arms.
          </p>
        </div>
      </div>
    </section>
  );
}
