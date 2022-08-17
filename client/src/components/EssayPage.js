import React from "react";
import styled from "styled-components";

import fonts from "../constants/fonts";
import colorscheme from "../constants/colorscheme";

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 20px;
`;

const Background = styled.div`
  background: ${colorscheme.primary};
`;

const EssayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 1em;
  width: 80%;
  margin: auto;
  background: ${colorscheme.primary};
`;

const EssayTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const EssayText = styled.div`
  font-size: 1rem;
  font-family: ${fonts.body};
`;

const CTAButton = styled.button`
  background-color: ${colorscheme.secondary};
  color: ${colorscheme.primary};
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  font-family: ${fonts.heading};
  margin-top: 1em;
  margin-bottom: 1em;
  &:hover {
    background-color: ${colorscheme.secondary};
    color: ${colorscheme.primary};
  }
`;

function EssayPage() {
  return (
    <Background>
      <EssayContainer>
        <a href="/">
          <Logo src={process.env.PUBLIC_URL + "light_logo.png"} />
        </a>
        <EssayTitle>Why We Need an Idea Editor</EssayTitle>
        <EssayText
          dangerouslySetInnerHTML={{
            __html: `				
					<p>
					This entire product is based on a series of ideation techniques collectively known as "lateral thinking." While I'll try to explain the ideas here, two great books on the subject (indeed the ones that got me hooked) are Sir Edward De Bono's "Lateral Thinking" and Michael Michalko's "Thinkertoys." I recommend reading "Lateral Thinking" first, to understand the core theory behind the techniques, with "Thinkertoys" serving to fill out one's metaphorical toolbox of lateral thinking techniques.
					</p>

					<p>
					At its heart, lateral thinking recognizes that when we are trying to ideate we naturally tend to fall into the same "ruts" of thinking. Put another way, one could say that in the vast infinite expanse of the space of all possible ideas (ideaspace) most of us tend to stick to a few relatively small islands of possible ideas.
				</p>
				<p>
					For example, if I was to try to design a new writing instrument, I might unconsciously make a few assumptions. Taking my cues from the writing instruments I'm already familiar with, i.e. pen, pencil, marker, crayon, paintbrush, etc, I might begin with the assumption that whatever instrument I'm going to use should be something roughly cylindrical that I hold in my hand, with a size roughly somewhere between 1 and 10 inches. While there is still a massive amount of room for creativity here, I have already restricted myself to a smaller slice of ideaspace.
				</p>
				<p>The size and shape assumptions may seem easy to recognize, but there are myriad other assumptions that one might make. One might assume the writing instrument was supposed to make marks by depositing some substance on the writing surface. There are plenty of other ways to make marks on paper, such as removing material from the writing surface or changing its color. Those techniques open the door to techniques such as engraving and burning.
				</p>
				<p>
				To take it even one step further, I might realize that what the writing instrument is really supposed to do (although this depends on the use case) is transmit information. Then I could start thinking of all the various ways I could communicate information.
				</p>
				<p>
					While the preceding examples of lateral thinking may seem obvious, they serve to illustrate the patterns of thought and iteration that characterize lateral thinking. Now we can begin to see why a tool like Thinky is helpful.
				</p>
				<p>
					As a baseline, imagine going through the preceding exercise with pen and paper. How would you organize your thoughts? You might create a list for possible shapes of the instrument. And further down the page, lists for different ways you might make a mark on the writing surface. You might even have a list of what possible writing surfaces you could use.


				</p>
				<p>
					This is all well and good, but how do you know how much space to devote to each list? When you start writing down your notes and stray thoughts about each particular list and its entries, you will almost certainly start to run out of space on the page and need to have some sort of overflow on another page. Once you go on long enough, perhaps in a multi-hour brainstorm session, or even worse over many brainstorming sessions separated by days/weeks, this tangle of lists and notes will become unmanageable.
				</p>
				When I first learned about lateral thinking, I started trying it out in exactly this way. I had a large stack of printer paper and I just started going for it. While I did have a lot of fun and generate some interesting ideas, I quickly realized that as romantic as the idea of ideating with just pen and paper is, those just aren't the ideal tools for the job.
				</p>
				<p>
				In my experience, one of the distinctive features of this kind of ideation via lateral thinking is that it naturally creates a tree-like pile of ideas. One top-level problem can be broken up into several main components that can be individually ideated on, and those components themselves can be broken up, and so on and so on, creating a tree that is presumably as deep as you want it to be. Any good ideation tool should be very good at managing this kind of branching structure of ideas. If you can't keep the branches all organized, a serious ideation project will collapse under its own weight or at the very least be slow and inefficient to work with.

				</p>
				At this point you might be thinking "aha, I can just use Notion or VS Code for this kind of thing! After all, they allow nesting of documents and would admit precisely this kind of a tree structure." That is precisely what I tried next on my ideation journey. While it was an upgrade, I found that it still wasn't ideal.
				</p>
				<p>
					Here are some of the reasons that I feel that while those are terrific tools for some tasks (I'm a big notion user myself) those products are not the ideal tools for lateral thinking ideation:
				</p>
				<ul>
					<li>
						It's important to be able to view multiple files at once, as well as easily manipulate the configuration of open files on the screen.
					</li>
					<li>
						Even if the software allows multiple files to be open simultaneously, you will frequently want to have multiple logical groups of files and the ability to switch between which configuration of files you are looking at. For example, you might want one open "tab" containing files for possible writing materials and another for ideating on possible writing surfaces, with each tab having multiple files being edited at once.

					</li>
					<li>
						Always having the entire file tree in focus (even if most nodes are collapsed) can create clutter and distraction. It would be preferable to be able to zoom in on a particular file and its descendants while working on that part of the tree and then zoom back out when you're done.
					</li>
					<li>
						Being able to keep a sprawling tree of ideas organized and navigable is really paramount to good ideation. If the ideas aren't organized and can't be refactored, then over time the project will grind to a halt. This principle reminds me of an analogy used to illustrate the benefits of unit tests when building software. If you had to pull a super heavy bucket out of a well with just a rope, it would be hard because you would have to do it all in one go. There would be no option to just set the rope down for a little while and come back to it later. As soon as you stopped working on it the weight would fall back down. On the other hand, if you have a ratchet mechanism to save your progress then you can easily come back to the weight whenever you want and incrementally raise it out of the well. Good organization functions like the ratchet in this case. You can tackle increasingly heavy ideation projects because you have

					</li>
				</ul>
				<p>
					There are of course plenty more ways that an ideation tool could remove friction from the process. And it seems clear to me that removing friction and supporting strong organization of thoughts are crucial to the ongoing success of any ideation program. While small inconveniences might not take much time from one's workday, the mental friction they cause can drastically slow down the thought process. Therefore a good ideation tool should seek to minimize friction as much as possible.
				</p>
				<p>
					Now we get to the part where I pitch my software. I built the Thinky Idea Editor to solve precisely the pain points that I have listed. Even if nobody else ever uses it, I feel like it has been a wild success for me personally. Is it perfect? Not yet. In fact, it's really pretty simple. There are surely tens of thousands of developers that could implement these ideas much better and much quicker than I have. But the reality is that Thinky is better than anything else I've used for the task of ideation, and playing with it is a real blast. I love the feeling of "exploring" ideaspace. I also find that I have a bunch of really cool ideas when I use it.
				</p>
				<p>
					Because it's a labor of love, you (the potential user) can expect many feature improvements. There is still a lot of friction to be eliminated. I haven't even started on trying to build features to explicitly help the user work through the tools listed in the book I mentioned earlier, "Thinkertoys." That will certainly be a massive upgrade. But for now, I really do feel that even in the current beta version, this "idea editor," combined with lateral thinking techniques, is extremely useful for helping anyone have really cool and novel ideas. Steve Jobs once said that a computer should behave like a "bicycle for the mind." I feel that this software does a very good job of being just that.

				</p>
				<p>
					Finally, a word of both warning and a word of encouragement. The warning is that while this is a remarkable tool for helping one come up with cool ideas, it doesn't do any of the work for you. Ideation is a process akin to writing, in that you have to just sit down and do it and be okay with feeling uncomfortable at not having good ideas right away. If you don't put in the time and effort, nothing will happen. That's not the fault of the editor. I find that it helps me to set a timer during which I don't allow myself to leave the editor. By the end of half an hour or so, I typically find that I'm rather intrigued by at least one new piece of ideaspace I've explored.

				</p>
				<p>
					And for encouragement, I just want to say that I sincerely think the world would be a vastly better place if everyone were to learn and regularly practice ideation. I personally do a really bad job at making time to use the editor, which is ironic because I'm its builder/promoter, but whenever I do I usually leave on a creative high where the world just seems like such a cool and unique place. In addition, I think there are so many great ideas out there that can improve both individual careers and the world at large. So go find them. Ideate, for fun and for profit. Best of luck.

				</p>
				<p>

					Zac Yauney
				</p>
				<p>
					P.S. I'm <a href="https://twitter.com/yauneyz">@yauneyz</a> on Twitter and I would welcome any feedback on this essay or the product. Talking with people about interesting ideas (especially this idea, since I'm working on it) is one of the things that makes life great.
				</p>`,
          }}
        />
        <a href="/register">
          <CTAButton>Click here to join the beta</CTAButton>
        </a>
      </EssayContainer>
    </Background>
  );
}

export default EssayPage;
