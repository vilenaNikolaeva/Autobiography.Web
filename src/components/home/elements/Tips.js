import React, { Component } from 'react';
import '../../../Styles/tips.css';
import { Carousel, Container } from 'react-bootstrap';

export default class Tips extends Component {
  render = () => {
    return (
      <Container className="tip-container" >
        <Carousel as="div" className="carousel-container">
          <Carousel.Item interval={100000}>
            <Carousel.Caption as="div" className="caption-container" >
              <h4 className="tip-title">Keep it real</h4>
              <p className="tip-article">
                Usually a CV should be that long !
                Employers spend, an average, just 8 seconds looking at any one CV, and a surefire way of landing
                yourself on the no pile is to send them your entire life story.
                Keep it punchy, to the point, and save those niggly little details for the interview.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item inerval={100000}>
            <Carousel.Caption as="div" className="caption-container" >
              <h4 className="tip-title" >Tailor it </h4>
              <p className="tip-article">
                We’ve all done it. Whizzed the same CV out to lots of employers to save time… Stop! Take the time to
                change your CV for each role that you apply for.
                Research the company and use the job advert to work out EXACTLY what skills you should point out to them.
                They will appreciate the obvious effort.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item inerval={100000}>
            <Carousel.Caption as="div" className="caption-container" >
              <h4 className="tip-title">Include a personal statement </h4>
              <p className="tip-article">
                Don’t just assume an employer will see how your experience relates to their job. Instead, use a short personal statement
                to explain why you are the best person for the job.
                This should be reflected in your cover letter as well see our paragraph to the perfect cover letter.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item inerval={100000}>
            <Carousel.Caption as="div" className="caption-container" >
              <h4 className="tip-title" >Don’t leave gaps </h4>
              <p className="tip-article">
                We are a cynical bunch and leaving obvious gaps on your CV immediately makes employers suspicious – and they won’t give
                you the benefit of the doubt.
                If you’ve been out of work it can be a worry but just put a positive spin on it.
                Did you do a course, volunteer work or develop soft skills such as communication, teamwork or project management? If so,
                shout about it!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item inerval={100000}>
            <Carousel.Caption as="div" className="caption-container" >
              <h4 className="tip-title">Keep it current </h4>
              <p className="tip-article">
                You should keep your CV up-to-date whether you’re looking for a job or not.
                Every time something significant occurs in your career, record it so you don’t later forget something that could be important.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item inerval={100000}>
            <Carousel.Caption as="div" className="caption-container" >
              <h4 className="tip-title">The error of your ways</h4>
              <p className="tip-article">
                Employers DO look for mistakes on CVs and if they find them, it makes you look really bad.
                If you’re unsure then use a spellchecker and ask someone else to double-check what you’ve written. And don’t ignore the most
                common CV mistakes.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item inerval={100000}>
            <Carousel.Caption as="div" className="caption-container">
              <h4 className="tip-title">Tell the truth </h4>
              <p className="tip-article">
                Everyone lies on their CV, right? NO! Stop! Blatant lies on your CV can land you in a whole heap of trouble when it comes to
                employers checking your background and references.
                The last thing you want is to start work and then lose your new job for for lying.
                You also may get caught out at the interview stage when you suddenly can’t answer questions on what you claim to know. And
                that can be VERY awkward!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item inerval={100000}>
            <Carousel.Caption as="div" className="caption-container" >
              <h4 className="tip-title">The maths </h4>
              <p className="tip-article">
                This may sound dull but by backing up your achievements with numbers it makes selling yourself much easier.
                When writing your work history, don’t just say that you increased sales; tell them you increased sales by 70% over a six
                month period.
                Get it? Big numbers are especially good (although don’t forget point 7 of our list!).
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item inerval={100000}>
            <Carousel.Caption as="div" className="caption-container">
              <h4 className="tip-title">Make it keyword friendly </h4>
              <p className="tip-article">
                If you’ve uploaded your CV to a job site so recruiters can find you, keywords are very important.
                Job titles and job buzzwords will help a search engine pick out your CV from the pile. Confused? Don’t be.
                A marketing candidate might mention SEO (Search Engine Optimization) for example… If you’re not sure,
                have a search online and see what words are commonly mentioned when you input your job title.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}