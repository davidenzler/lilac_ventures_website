import React from 'react';
import './About.css';
import gailProfile from './assets/img/gail_profile_imag4e.jpg';

const About: React.FC = () => {
    return (
        <div className="about-page">
            <section className="intro-section">
            <div className="intro-text">
                    <p>YOU ARE NOT POOR, YOU ARE BROKE.</p>
                    <p>I CAN’T FIX POOR BUT I CAN FIX BROKE.</p>
                    <p>
                        I am a DOLLARS and SENSE MOM, a certified financial coach who believes in 
                        Mind Over Money aka MINDFUL SPENDING because it gives you CONTROL over and dictates where your money goes.
                    </p>
                    <p>
                        But like many of you, I have made some financial mistakes that have put me in so much financial stress 
                        that I thought there was no way out of the debt hole. With focused intentionality, I was able to dig myself 
                        out and finally found financial stability and achieved a positive net worth.
                    </p>
                    {/* Profile image is placed here, between the paragraphs */}
                    <div className="profile-container">
                        <img src={gailProfile} alt="Gail Profile" className="profile-img"/>
                    </div>
                    <p>
                        I teach from experience because it is one of the most effective ways to share the lessons learned. 
                        My story is all too common that anybody can relate. The difference is not everybody is able to successfully 
                        say “I won over money”. And I DID! That’s why I make it my personal goal that YOU my clients will WIN in 
                        life one dollar at a time.
                    </p>
                    <p>
                        YOU hold the key to your success, I am your ally in the process.
                    </p>
                    <button className="talk-button">LET’S TALK!</button>
                </div>
            </section>

            <section className="history-section">
                <h2>Our History</h2>
                <p>
                    Lilac Ventures offers financial coaching program that is focused on mindful spending. 
                    We help you understand the dynamics of income and spending and EMPOWER YOU to control your money. 
                    Our coaching service is not rocket science. It is based on proven strategic and progressive steps 
                    that are SIMPLE to follow and GUARANTEED to deliver the results you need as you take control of 
                    your life, while using the income and resources you have. We make your money work for you! 
                    You want to learn more? 
                </p>
                <div className="center-button">
                    <button className="talk-button">LET’S TALK!</button>
                </div>
            </section>

            <section className="mission-section">
                <h2>Our Mission</h2>
                <p>Winning and changing lives through mindful spending one dollar at a time.</p>
            </section>

            <section className="values-section">
                <h2>Our Values</h2>
                <p>
                    Short paragraph with Lilac Ventures mission statement, who it wants to help, why, etc. 
                    Lorem ipsum dolor sit amet. Et libero consequatur aut velit labore qui deleniti possimus 
                    eum atque quae At ducimus repudiandae qui consequatur omnis id rerum corrupti. Qui quaerat 
                    explicabo non tenetur quia rem sint quia. Sed tempora quod et vitae eius rem dolores quod 
                    sit officia praesentium.
                </p>
            </section>
        </div>
    );
}

export default About;
