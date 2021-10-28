import React, { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
// import logoMain from '@src/assets/images/logo-black.svg';
// import notificationBell from '@src/assets/images/notification.png';
// import loggedinuser from '@src/assets/images/loggedinuser.svg';
// import configure from '@src/assets/images/configure-2.png';
// import PlusiCon from '@src/assets/images/plus-circle.svg';
// import uploadIcon from '@src/assets/images/upload-cloud.svg';
// import trashIcon from '@src/assets/images/trash-white-icon.svg';
// import closeIcon from '@src/assets/images/close-icon.svg';
// import eyeOff from '@src/assets/images/eye-off.svg';
import Page from '@components/templates/Page';
import { OuterMostWrapper, SecondaryHeader } from './style';

const Faq = () => {
  const faqs = [
    {
      question: 'What is Sizigi?',
      answer:
        'Sizigi is an ePortfolio platform empowering professionals to tell their stories through immersive content that deeply connect with hiring teams and companies. Sizigi replaces ancient paper resumes with visual storytelling by curating videos, blog posts, links and documents that represent one’s unique professional brand.<br/><br /> Professionals and students now have the freedom to create their own unique brand and demonstrate their employable skills through engaging presentations of their ePortfolio. Just like every video, post and picture we upload socially creates a shareable view into who we are, Sizigi allows you to create digital experiences that get you hired.',
    },
    {
      question: 'I have created an account, what do I do now?',
      answer:
        'Adding content to your ePortfolio is the next step in standing out to hiring teams! Kicking off your content may be difficult if you’re unsure where to start. But don’t feel overwhelmed! This is all about you and highlighting your strengths beyond a bullet point! <br /><br />•Experienced in excel? Upload a video explaining how you worked through a model <br/>•Proficient in another language? Create content that shows off your written/verbal skill level in that language <br />•Advanced in writing? Share a link to published works you have created online <br /><br />Once you’ve added your ePortfolio content, create a presentation and begin sharing your link with hiring teams, selection committees, networking platforms, social or anywhere else!',
    },
    {
      question: 'What is a Professional Brand?',
      answer:
        'Professional branding is the practice of marketing people and their careers as brands. Unlike a resume, this isn’t something that is updated only when seeking a new position. It is an ongoing process of maintaining your professional moments in one space. Just as we constantly update Instagram with our top photos and itunes with our newest favorite songs, Sizigi holds your most important professional content as it continues to evolve and grow throughout your career.',
    },
    {
      question: 'When should I share my Presentations?',
      answer:
        'With Sizigi, your professional brand is on-demand whenever you need it.  Once you’ve added content to your ePortfolio, create a presentation and share your link in various situations including standing out in the application process, looking to add additional content to your quarterly reviews, switching careers or sharing development or certifications in other areas, having content to support a promotion and so much more.',
    },
    {
      question: 'How can I share my ePortfolio',
      answer:
        'You can share your ePortfolio by sending your link to anyone you want to view your content, or by posting your link on other platforms.<br /><br/ >Start by logging into your account, once you are logged in, on the top navigation bar you will go to Presentations. Under My Presentations, you will see your ePortfolio link.',
    },
    {
      question: 'How do I upload a video to my ePortfolio?',
      answer:
        'Start by logging into your account, once you are logged in, on the top right hand corner you will see a Portfolio icon, select this icon. On the right hand corner select the button that says New Post. A dropdown menu with different types of content you can create.<br /><br />Select Upload Video. Add the information needed to upload your video content. Once you have added all the content for your video, select the Publish button on the top right corner.',
    },
    {
      question: 'How do I upload a link to my ePortfolio?',
      answer:
        'Start by logging into your account, once you are logged in, on the top right hand corner you will see a Portfolio icon, select this icon. On the right hand corner select the button that says New Post. A dropdown menu with different types of content you can create.<br /><br />Select External Link. Insert the information needed to add your link. Once you have added all the information for your link, select the Publish button on the top right corner.',
    },
    {
      question: 'How do I create a blog on my ePortfolio?',
      answer:
        'Start by logging into your account, once you are logged in, on the top right hand corner you will see a Portfolio icon, select this icon. On the right hand corner select the button that says New Post. A dropdown menu with different types of content you can create.<br /><br />Select Create Blog. Add the content needed to create your blog. Once you have added all the content for your blog, select the Publish button on the top right corner.',
    },
    {
      question: 'Can I apply for jobs here?',
      answer:
        'Sizigi is all about creating your professional brand. We have a specialized recruiting team with industry background that will reach out with job opportunities if your digital portfolio and brand align with a position Sizigi is recruiting for.<br /><br />Your digital portfolio is a tangible asset to your resume. Send this along with your resume whether applying to positions on LinkedIn, Indeed or any other job board.',
    },
    {
      question: 'How is Sizigi different from LinkedIn?',
      answer:
        'Sizigi is an ePortfolio platform fueled by presentations with immersive content. You’re no longer constrained to one to two pieces of paper and a few bullet points to tell your professional story. You can now create robust three-dimensional resumes that get you hired! ',
    },
    {
      question: 'How do I delete content from my ePortfolio?',
      answer:
        'To delete content from your ePortfolio, begin by logging into your account. On the top right hand corner you will see a Portfolio icon, select this icon. Hover over the content you would like to delete. Three dots will pop up on the right hand corner of this piece of content, click them and select delete.',
    },
    {
      question: 'How can I delete my account?',
      answer:
        'If you would like to delete your account please send an email to support@joinsizigi.com letting us know you would like your account deleted. Please include the email address and name you used when creating your account.',
    },
    {
      question: 'How do I upload a document to my ePortfolio?',
      answer:
        'Start by logging into your account, once you are logged in, on the top right hand corner you will see a Portfolio icon, select this icon. On the right hand corner select the button that says New Post. <br /><br />A dropdown menu with different types of content you can create. Select Create Document. Add the information needed to upload your document. Once you have added all the information requested, select the Publish button on the top right corner.',
    },
  ];
  const [faq, setFaq] = useState(faqs);
  const rightContent = () => (
    <div className="faq-page pt-5 p-b-80">
      <div className="container">
        <h1 className="head-text font-weight-bold mb-4">FAQ</h1>
        <div className="row">
          <div className="col-md-10 offset-md-1" id="faqGroup">
            {faq.map((question, i) => (
              <div>
                <div
                  className="faq-question position-relative pointer collapsed"
                  role="button"
                  data-toggle="collapse"
                  data-target={`#faq${i}`}
                  aria-expanded="false"
                  aria-controls={`faq${i}`}
                >
                  {question.question}
                </div>
                <div
                  className="collapse"
                  id={`faq${i}`}
                  data-parent="#faqGroup"
                >
                  <div
                    className="faq-answer"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const content = rightContent();
  return (
    <Page
      title="Faq Info"
      description="Faq Info Page"
      nav={{ show: false }}
      topbar={{ show: false }}
      isVerified
    >
      {content}
    </Page>
  );
};

export default Faq;
