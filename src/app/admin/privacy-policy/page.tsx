import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="flex items-center justify-center container scroll-smooth">
      <div className="flex flex-col gap-y-10 mt-[60px] text-[var(--darkBrown)] justify-start items-center p-12">
        <div className="flex flex-col text-center">
          <div className="text-3xl font-semibold">
            <span className="italic font-medium">Privacy</span> Policy
          </div>
          <div className="text-xs">Last updated June 07, 2024 </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-y-5 w-full">
          <div className="text-xs">
            This privacy notice for Coffee Culture London LTD (doing business as Coffee Culture UK) ('we', 'us', or 'our'), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:
          </div>
          <ul className="list-disc pl-6 text-xs">
            <li>
              Visit our website at <a href="https://www.coffee-culture.uk">https://www.coffee-culture.uk</a>, or any website of ours that links to this privacy notice
            </li>
            <li>
              Download and use our mobile application (Coffee Culture), or any other application of ours that links to this privacy notice
            </li>
            <li>
              Engage with us in other related ways, including any sales, marketing, or events
            </li>
          </ul>
          <div className="text-xs">
            Questions or concerns? <br /><br />Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:info@coffee-culture.uk">info@coffee-culture.uk</a>.
          </div>
        </div>

        {/* Summary of Key Points */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full">
          <div className="text-xl font-medium">Summary of Key Points</div>
          <div className="text-xs">
            This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
            <br />
            <br />
            <strong>What personal information do we process?</strong> <br />When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a href="#whatinformation">personal information you disclose to us</a>.
            <br />
            <br />
            <strong>Do we process any sensitive personal information?</strong> <br />We do not process sensitive personal information.
            <br />
            <br />
            <strong>Do we collect any information from third parties?</strong> <br />We do not collect any information from third parties.
            <br />
            <br />
            <strong>How do we process your information?</strong> <br />We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a href="#howweprocess">how we process your information</a>.
            <br />
            <br />
            <strong>In what situations and with which types of parties do we share personal information?</strong><br /> We may share information in specific situations and with specific categories of third parties. Learn more about <a href="#whenshare">when and with whom we share your personal information</a>.
            <br />
            <br />
            <strong>How do we keep your information safe?</strong> <br />We have organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about <a href="#howkeepsafe">how we keep your information safe</a>.
            <br />
            <br />
            <strong>What are your rights?</strong> <br />Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a href="#privacyrights">your privacy rights</a>.
            <br />
            <br />
            <strong>How do you exercise your rights?</strong> <br />The easiest way to exercise your rights is by visiting <a href="https://www.coffee-culture.uk">https://www.coffee-culture.uk</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
            <br />
            <br />
            Want to learn more about what we do with any information we collect? Review the privacy notice in full.
          </div>
        </div>

        {/* Table of Contents */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full">
          <div className="text-xl font-medium">Table of Contents</div>
          <ol className="text-xs list-decimal pl-6">
            <li>
              <a href="#whatinformation">WHAT INFORMATION DO WE COLLECT?</a>
            </li>
            <li>
              <a href="#howweprocess">HOW DO WE PROCESS YOUR INFORMATION?</a>
            </li>
            <li>
              <a href="#legalbases">
                WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?
              </a>
            </li>
            <li>
              <a href="#whenshare">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>
            </li>
            <li>
              <a href="#cookies">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a>
            </li>
            <li>
              <a href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>
            </li>
            <li>
              <a href="#howlong">HOW LONG DO WE KEEP YOUR INFORMATION?</a>
            </li>
            <li>
              <a href="#howkeepsafe">HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
            </li>
            <li>
              <a href="#privacyrights">WHAT ARE YOUR PRIVACY RIGHTS?</a>
            </li>
            <li>
              <a href="#donottrack">CONTROLS FOR DO-NOT-TRACK FEATURES</a>
            </li>
            <li>
              <a href="#updates">DO WE MAKE UPDATES TO THIS NOTICE?</a>
            </li>
            <li>
              <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
            </li>
            <li>
              <a href="#reviewupdate">
                HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
              </a>
            </li>
          </ol>
        </div>

        {/* Sections */}
        {/* Section 1 */}
        <div
          className="flex flex-col justify-start items-start gap-y-5 w-full"
          id="whatinformation"
        >
          <div className="text-xl font-medium">1. What Information Do We Collect?</div>
          <div className="text-lg font-medium">Personal Information You Disclose To Us</div>
          <div className="text-xs">
            In Short: We collect personal information that you provide to us.
            <br />
            <br />
            We collect personal information that you voluntarily provide to us when you register
            on the Services, express an interest in obtaining information about us or our products
            and Services, when you participate in activities on the Services, or otherwise when
            you contact us.
            <br />
            <br />
            <span className="font-medium">Personal Information Provided by You.</span> The personal
            information that we collect depends on the context of your interactions with us and
            the Services, the choices you make, and the products and features you use. The
            personal information we collect may include the following:
          </div>
          <ul className="list-disc pl-6 text-xs">
            <li>names</li>
            <li>phone numbers</li>
            <li>email addresses</li>
            <li>mailing addresses</li>
            <li>usernames</li>
            <li>passwords</li>
            <li>contact preferences</li>
            <li>debit/credit card numbers</li>
            <li>billing addresses</li>
          </ul>
          <div className="text-xs pl-6">
            <span className="font-medium">Sensitive Information.</span> We do not process sensitive
            information.
            <br />
            <br />
            <span className="font-medium">Payment Data.</span> We may collect data necessary to
            process your payment if you choose to make purchases, such as your payment instrument
            number, and the security code associated with your payment instrument. All payment
            data is handled and stored by Stripe. You may find their privacy notice link(s) here:{' '}
            <a href="https://stripe.com/gb/privacy">https://stripe.com/gb/privacy</a>.
            <br />
            <br />
            <span className="font-medium">Social Media Login Data.</span> We may provide you with
            the option to register with us using your existing social media account details, like
            your Facebook, X, or other social media account. If you choose to register in this
            way, we will collect certain profile information about you from the social media
            provider, as described in the section called 
            <a href="#sociallogins">'HOW DO WE HANDLE YOUR SOCIAL LOGINS?'</a> below.
            <br />
            <br />
            <span className="font-medium">Application Data.</span> If you use our application(s), we
            also may collect the following information if you choose to provide us with access or
            permission:
          </div>
          <ul className="list-disc pl-6 text-xs">
            <li>
              <span className="font-medium">Geolocation Information.</span> We may request access or
              permission to track location-based information from your mobile device, either
              continuously or while you are using our mobile application(s), to provide certain
              location-based services. If you wish to change our access or permissions, you may do
              so in your device's settings.
            </li>
            <li>
              <span className="font-medium">Mobile Device Access.</span> We may request access or
              permission to certain features from your mobile device, including your mobile
              device's calendar, and other features. If you wish to change our access or
              permissions, you may do so in your device's settings.
            </li>
            <li>
              <span className="font-medium">Push Notifications.</span> We may request to send you
              push notifications regarding your account or certain features of the application(s).
              If you wish to opt out from receiving these types of communications, you may turn
              them off in your device's settings.
            </li>
          </ul>
          <div className="text-xs">
            This information is primarily needed to maintain the security and operation of our
            application(s), for troubleshooting, and for our internal analytics and reporting
            purposes.
            <br />
            <br />
            All personal information that you provide to us must be true, complete, and accurate,
            and you must notify us of any changes to such personal information.
          </div>
        </div>

        {/* Section 2 */}
        <div
          className="flex flex-col justify-start items-start gap-y-5 w-full"
          id="howweprocess"
        >
          <div className="text-xl font-medium">2. How Do We Process Your Information?</div>
          <div className="text-xs">
            In Short: We process your information to provide, improve, and administer our Services,
            communicate with you, for security and fraud prevention, and to comply with law. We may
            also process your information for other purposes with your consent.
            <br />
            <br />
            We process your personal information for a variety of reasons, depending on how you
            interact with our Services, including:
          </div>
          <ul className="list-disc pl-6 text-xs">
            <li>
              <span className="font-medium">
                To facilitate account creation and authentication and otherwise manage user
                accounts.
              </span>
              We may process your information so you can create and log in to your account, as well
              as keep your account in working order.
            </li>
            <li>
              <span className="font-medium">
                To deliver and facilitate delivery of services to the user.
              </span>
              We may process your information to provide you with the requested service.
            </li>
            <li>
              <span className="font-medium">To request feedback.</span>
              We may process your information when necessary to request feedback and to contact you
              about your use of our Services.
            </li>
            <li>
              <span className="font-medium">
                To send you marketing and promotional communications.
              </span>
              We may process the personal information you send to us for our marketing purposes, if
              this is in accordance with your marketing preferences. You can opt out of our
              marketing emails at any time. For more information, see{' '}
              <a href="#privacyrights">'WHAT ARE YOUR PRIVACY RIGHTS?'</a> below.
            </li>
            <li>
              <span className="font-medium">To deliver targeted advertising to you.</span>
              We may process your information to develop and display personalised content and
              advertising tailored to your interests, location, and more.
            </li>
            <li>
              <span className="font-medium">To protect our Services.</span>
              We may process your information as part of our efforts to keep our Services safe and
              secure, including fraud monitoring and prevention.
            </li>
            <li>
              <span className="font-medium">To identify usage trends.</span>
              We may process information about how you use our Services to better understand how
              they are being used so we can improve them.
            </li>
            <li>
              <span className="font-medium">
                To save or protect an individual's vital interest.
              </span>
              We may process your information when necessary to save or protect an individual’s
              vital interest, such as to prevent harm.
            </li>
          </ul>
        </div>
        {/* Section 3 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="legalbases">
          <div className="text-xl font-medium">
            3. What Legal Bases Do We Rely On To Process Your Personal Information?
          </div>
          <div className="text-xs ">
            In Short: We only process your personal information when we believe it is necessary and we
            have a valid legal reason (i.e., legal basis) to do so under applicable law, like with
            your consent, to comply with laws, to provide you with services to enter into or fulfil
            our contractual obligations, to protect your rights, or to fulfil our legitimate business
            interests.
            <br />
            <br />
            The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid
            legal bases we rely on in order to process your personal information. As such, we may rely
            on the following legal bases to process your personal information:
          </div>
          <ul className="list-disc pl-6 text-xs">
            <li>
              <span className="font-medium">Consent:</span> We may process your information if you
              have given us permission (i.e., consent) to use your personal information for a specific
              purpose. You can withdraw your consent at any time. Learn more about{' '}
              <a href="#privacyrights">withdrawing your consent</a>.
            </li>
            <li>
              <span className="font-medium">Performance of a Contract:</span> We may process your
              personal information when we believe it is necessary to fulfil our contractual
              obligations to you, including providing our Services or at your request prior to entering
              into a contract with you.
            </li>
            <li>
              <span className="font-medium">Legitimate Interests:</span> We may process your
              information when we believe it is reasonably necessary to achieve our legitimate business
              interests and those interests do not outweigh your interests and fundamental rights and
              freedoms. For example, we may process your personal information for some of the purposes
              described in order to:
              <ul className="list-disc pl-6 text-xs">
                <li>Send users information about special offers and discounts on our products and services</li>
                <li>Develop and display personalised and relevant advertising content for our users</li>
                <li>Analyse how our Services are used so we can improve them to engage and retain users</li>
                <li>Diagnose problems and/or prevent fraudulent activities</li>
                <li>Understand how our users use our products and services so we can improve user experience</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">Legal Obligations:</span> We may process your information
              where we believe it is necessary for compliance with our legal obligations, such as to
              cooperate with a law enforcement body or regulatory agency, exercise or defend our legal
              rights, or disclose your information as evidence in litigation in which we are involved.
            </li>
            <li>
              <span className="font-medium">Vital Interests:</span> We may process your information
              where we believe it is necessary to protect your vital interests or the vital interests
              of a third party, such as situations involving potential threats to the safety of any
              person.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="whenshare">
          <div className="text-xl font-medium">
            4. When And With Whom Do We Share Your Personal Information?
          </div>
          <div className="text-xs ">
            In Short: We may share information in specific situations described in this section and/or
            with the following categories of third parties.
            <br />
            <br />
            <span className="font-medium">
              Vendors, Consultants, and Other Third-Party Service Providers:
            </span>{' '}
            We may share your data with third-party vendors, service providers, contractors, or agents
            ("third parties") who perform services for us or on our behalf and require access to such
            information to do that work. We have contracts in place with our third parties, which are
            designed to help safeguard your personal information. This means that they cannot do
            anything with your personal information unless we have instructed them to do it. They will
            also not share your personal information with any organisation apart from us. They also
            commit to protect the data they hold on our behalf and to retain it for the period we
            instruct.
            <br />
            <br />
            The categories of third parties we may share personal information with are as follows:
          </div>
          <ul className="list-disc pl-6 text-xs">
            <li>Social Networks</li>
            <li>Payment Processors</li>
            <li>Data Analytics Services</li>
            <li>Affiliate Marketing Programs</li>
            <li>User Account Registration & Authentication Services</li>
          </ul>
          <div className="text-xs ">
            We also may need to share your personal information in the following situations:
          </div>
          <ul className="list-disc pl-6 text-xs">
            <li>
              <span className="font-medium">Business Transfers:</span> We may share or transfer your
              information in connection with, or during negotiations of, any merger, sale of company
              assets, financing, or acquisition of all or a portion of our business to another company.
            </li>
            <li>
              <span className="font-medium">When we use Google Maps Platform APIs:</span> We may share
              your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places
              API).
            </li>
            <li>
              <span className="font-medium">Business Partners:</span> We may share your information
              with our business partners to offer you certain products, services, or promotions.
            </li>
            <li>
              <span className="font-medium">Offer Wall:</span> Our application(s) may display a
              third-party hosted "offer wall." Such an offer wall allows third-party advertisers to
              offer virtual currency, gifts, or other items to users in return for the acceptance and
              completion of an advertisement offer. Such an offer wall may appear in our application(s)
              and be displayed to you based on certain data, such as your geographic area or
              demographic information. When you click on an offer wall, you will be brought to an
              external website belonging to other persons and will leave our application(s). A unique
              identifier, such as your user ID, will be shared with the offer wall provider in order to
              prevent fraud and properly credit your account with the relevant reward.
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="cookies">
          <div className="text-xl font-medium">
            5. Do We Use Cookies And Other Tracking Technologies?
          </div>
          <div className="text-xs">
            In Short: We may use cookies and other tracking technologies to collect and store your
            information.
            <br />
            <br />
            We may use cookies and similar tracking technologies (like web beacons and pixels) to
            gather information when you interact with our Services. Some online tracking technologies
            help us maintain the security of our Services and your account, prevent crashes, fix bugs,
            save your preferences, and assist with basic site functions.
            <br />
            <br />
            We also permit third parties and service providers to use online tracking technologies on
            our Services for analytics and advertising, including to help manage and display
            advertisements, to tailor advertisements to your interests, or to send abandoned shopping
            cart reminders (depending on your communication preferences). The third parties and service
            providers use their technology to provide advertising about products and services tailored
            to your interests which may appear either on our Services or on other websites.
            <br />
            <br />
            Specific information about how we use such technologies and how you can refuse certain
            cookies is set out in our Cookie Notice.
          </div>
        </div>

        {/* Section 6 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="sociallogins">
          <div className="text-xl font-medium">6. How Do We Handle Your Social Logins?</div>
          <div className="text-xs">
            In Short: If you choose to register or log in to our Services using a social media account,
            we may have access to certain information about you.
            <br />
            <br />
            Our Services offer you the ability to register and log in using your third-party social
            media account details (like your Facebook or X logins). Where you choose to do this, we
            will receive certain profile information about you from your social media provider. The
            profile information we receive may vary depending on the social media provider concerned,
            but will often include your name, email address, friends list, and profile picture, as well
            as other information you choose to make public on such a social media platform.
            <br />
            <br />
            We will use the information we receive only for the purposes that are described in this
            privacy notice or that are otherwise made clear to you on the relevant Services. Please
            note that we do not control, and are not responsible for, other uses of your personal
            information by your third-party social media provider. We recommend that you review their
            privacy notice to understand how they collect, use, and share your personal information,
            and how you can set your privacy preferences on their sites and apps.
          </div>
        </div>

        {/* Section 7 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="howlong">
          <div className="text-xl font-medium">7. How Long Do We Keep Your Information?</div>
          <div className="text-xs">
            In Short: We keep your information for as long as necessary to fulfil the purposes outlined
            in this privacy notice unless otherwise required by law.
            <br />
            <br />
            We will only keep your personal information for as long as it is necessary for the purposes
            set out in this privacy notice, unless a longer retention period is required or permitted
            by law (such as tax, accounting, or other legal requirements). No purpose in this notice
            will require us keeping your personal information for longer than six (6) months past the
            termination of the user's account.
            <br />
            <br />
            When we have no ongoing legitimate business need to process your personal information, we
            will either delete or anonymise such information, or, if this is not possible (for example,
            because your personal information has been stored in backup archives), then we will
            securely store your personal information and isolate it from any further processing until
            deletion is possible.
          </div>
        </div>

        {/* Section 8 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="howkeepsafe">
          <div className="text-xl font-medium">8. How Do We Keep Your Information Safe?</div>
          <div className="text-xs">
            In Short: We aim to protect your personal information through a system of organisational and
            technical security measures.
            <br />
            <br />
            We have implemented appropriate and reasonable technical and organisational security
            measures designed to protect the security of any personal information we process. However,
            despite our safeguards and efforts to secure your information, no electronic transmission
            over the Internet or information storage technology can be guaranteed to be 100% secure, so
            we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third
            parties will not be able to defeat our security and improperly collect, access, steal, or
            modify your information. Although we will do our best to protect your personal information,
            transmission of personal information to and from our Services is at your own risk. You
            should only access the Services within a secure environment.
          </div>
        </div>

        {/* Section 9 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="privacyrights">
          <div className="text-xl font-medium">9. What Are Your Privacy Rights?</div>
          <div className="text-xs">
            In Short: In some regions, such as the European Economic Area (EEA), United Kingdom (UK),
            and Switzerland, you have rights that allow you greater access to and control over your
            personal information. You may review, change, or terminate your account at any time,
            depending on your country, province, or state of residence.
            <br />
            <br />
            In some regions (like the EEA, UK, and Switzerland), you have certain rights under
            applicable data protection laws. These may include the right (i) to request access and
            obtain a copy of your personal information, (ii) to request rectification or erasure; (iii)
            to restrict the processing of your personal information; (iv) if applicable, to data
            portability; and (v) not to be subject to automated decision-making. In certain
            circumstances, you may also have the right to object to the processing of your personal
            information. You can make such a request by contacting us by using the contact details
            provided in the section 
            <a href="#contact">'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?'</a> below.
            <br />
            <br />
            We will consider and act upon any request in accordance with applicable data protection
            laws.
            <br />
            <br />
            If you are located in the EEA or UK and you believe we are unlawfully processing your
            personal information, you also have the right to complain to your Member State data
            protection authority or UK data protection authority.
            <br />
            <br />
            If you are located in Switzerland, you may contact the Federal Data Protection and
            Information Commissioner.
            <br />
            <br />
            <span className="font-medium">Withdrawing your consent:</span> If we are relying on your
            consent to process your personal information, you have the right to withdraw your consent
            at any time. You can withdraw your consent at any time by contacting us by using the
            contact details provided in the section 
            <a href="#contact">'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?'</a> below or updating your
            preferences.
            <br />
            <br />
            However, please note that this will not affect the lawfulness of the processing before its
            withdrawal nor will it affect the processing of your personal information conducted in
            reliance on lawful processing grounds other than consent.
            <br />
            <br />
            <span className="font-medium">
              Opting out of marketing and promotional communications:
            </span>{' '}
            You can unsubscribe from our marketing and promotional communications at any time by
            clicking on the unsubscribe link in the emails that we send, replying "STOP" or
            "UNSUBSCRIBE" to the SMS messages that we send, or by contacting us using the details
            provided in the section 
            <a href="#contact">'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?'</a> below. You will then be
            removed from the marketing lists. However, we may still communicate with you—for example,
            to send you service-related messages that are necessary for the administration and use of
            your account, to respond to service requests, or for other non-marketing purposes.
            <br />
            <br />
            <span className="font-medium">Account Information</span>
            <br />
            <br />
            If you would at any time like to review or change the information in your account or
            terminate your account, you can:
          </div>
          <ul className="list-disc pl-6 text-xs">
            <li>Log in to your account settings and update your user account.</li>
            <li>Contact us using the contact information provided.</li>
          </ul>
          <div className="text-xs">
            Upon your request to terminate your account, we will deactivate or delete your account and
            information from our active databases. However, we may retain some information in our files
            to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal
            terms, and/or comply with applicable legal requirements.
            <br />
            <br />
            If you have questions or comments about your privacy rights, you may email us at{' '}
            <a href="mailto:info@coffee-culture.uk">info@coffee-culture.uk</a>.
          </div>
        </div>

        {/* Section 10 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="donottrack">
          <div className="text-xl font-medium">10. Controls For Do-Not-Track Features</div>
          <div className="text-xs">
            Most web browsers and some mobile operating systems and mobile applications include a
            Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference
            not to have data about your online browsing activities monitored and collected. At this
            stage, no uniform technology standard for recognising and implementing DNT signals has been
            finalised. As such, we do not currently respond to DNT browser signals or any other
            mechanism that automatically communicates your choice not to be tracked online. If a
            standard for online tracking is adopted that we must follow in the future, we will inform
            you about that practice in a revised version of this privacy notice.
          </div>
        </div>

        {/* Section 11 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="updates">
          <div className="text-xl font-medium">11. Do We Make Updates To This Notice?</div>
          <div className="text-xs">
            In Short: Yes, we will update this notice as necessary to stay compliant with relevant
            laws.
            <br />
            <br />
            We may update this privacy notice from time to time. The updated version will be indicated
            by an updated "Revised" date at the top of this privacy notice. If we make material changes
            to this privacy notice, we may notify you either by prominently posting a notice of such
            changes or by directly sending you a notification. We encourage you to review this privacy
            notice frequently to be informed of how we are protecting your information.
          </div>
        </div>

        {/* Section 12 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="contact">
          <div className="text-xl font-medium">12. How Can You Contact Us About This Notice?</div>
          <div className="text-xs">
            If you have questions or comments about this notice, you may email us at{' '}
            <a href="mailto:info@coffee-culture.uk">info@coffee-culture.uk</a> or contact us by post
            at:
            <br />
            <br />
            Coffee Culture London LTD
            <br />
            <a href="mailto:tanyathadani@hotmail.com">tanyathadani@hotmail.com</a>
            <br />
            26 Beverly House
            <br />
            Park Road, London NW8 7JD
            <br />
            England
          </div>
        </div>

        {/* Section 13 */}
        <div className="flex flex-col justify-start items-start gap-y-5 w-full" id="reviewupdate">
          <div className="text-xl font-medium">
            13. How Can You Review, Update, Or Delete The Data We Collect From You?
          </div>
          <div className="text-xs">
            Based on the applicable laws of your country, you may have the right to request access to
            the personal information we collect from you, details about how we have processed it,
            correct inaccuracies, or delete your personal information. You may also have the right to
            withdraw your consent to our processing of your personal information. These rights may be
            limited in some circumstances by applicable law. To request to review, update, or delete
            your personal information, please visit: 
            <a href="https://www.coffee-culture.uk">https://www.coffee-culture.uk</a>.
          </div>
        </div>
      </div>
    </div> 
  );
}