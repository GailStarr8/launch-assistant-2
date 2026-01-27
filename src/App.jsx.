import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, Sparkles, Download, RotateCcw, ChevronDown, ChevronUp, List, Lock } from 'lucide-react';

const LaunchAssistant = () => {
  const [startDate, setStartDate] = useState('');
  const [launchType, setLaunchType] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [launchEventDate, setLaunchEventDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showLaunchPlanner, setShowLaunchPlanner] = useState(false);
  const [hasCompletedWeek1, setHasCompletedWeek1] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [viewMode, setViewMode] = useState('current');
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [newLaunchDate, setNewLaunchDate] = useState('');
  const [showClearModal, setShowClearModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showCatchUp, setShowCatchUp] = useState(false);
  const [focusWeek, setFocusWeek] = useState(null); // For manual week navigation

  // Load saved data from storage on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedPlan = await window.storage.get('launch-plan');
        if (savedPlan && savedPlan.value) {
          const planData = JSON.parse(savedPlan.value);
          setStartDate(planData.startDate);
          setLaunchType(planData.launchType || '');
          setLaunchEventDate(planData.launchEventDate || '');
          setCustomDescription(planData.customDescription || '');
          setTasks(planData.tasks);
          setHasCompletedWeek1(planData.hasCompletedWeek1 || false);
          setShowDashboard(true);
        }
      } catch (error) {
        console.log('No saved plan found');
      }
    };
    loadSavedData();
  }, []);

  // Save data whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      const savePlan = async () => {
        try {
          await window.storage.set('launch-plan', JSON.stringify({
            startDate,
            launchType,
            launchEventDate,
            customDescription,
            tasks,
            hasCompletedWeek1
          }));
        } catch (error) {
          console.error('Error saving plan:', error);
        }
      };
      savePlan();
    }
  }, [tasks, startDate, launchType, launchEventDate, customDescription, hasCompletedWeek1]);

  // Get motivational quote
  useEffect(() => {
    const quotes = [
      "Every task completed is momentum building! Keep going! 🚀",
      "Your future students are waiting for this launch. You've got this! 💪",
      "Progress over perfection. You're doing amazing! ✨",
      "Small steps daily = massive launch success! 🎯",
      "You're not just launching - you're transforming lives! 🌟",
      "Consistency beats intensity. Show up today! 💫",
      "This launch is happening because YOU are making it happen! 🔥",
      "Your message matters. Keep moving forward! 💝"
    ];
    const today = new Date().getDate();
    setMotivationalQuote(quotes[today % quotes.length]);
  }, [tasks]);

  const launchTypes = [
    { value: 'webinar', label: 'Live Webinar Launch' },
    { value: 'challenge', label: 'Challenge Launch' },
    { value: 'video', label: 'Video Series Launch' }
  ];

  const generateWeek1Only = async () => {
    setIsGenerating(true);
    
    const week1Tasks = generateWeek1Tasks(startDate);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTasks(week1Tasks);
    setShowDashboard(true);
    setViewMode('current');
    setIsGenerating(false);
  };

  const generateFullLaunchPlan = async () => {
    setIsGenerating(true);
    
    const fullPlan = generateCompletePlan(launchType, startDate, launchEventDate, customDescription);
    
    const delay = launchType === 'custom' ? 3000 : 1500;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    setTasks(fullPlan);
    setHasCompletedWeek1(true);
    setShowLaunchPlanner(false);
    setViewMode('current'); // Make sure they're in current week view
    setIsGenerating(false);
  };

  const generateWeek1Tasks = (start) => {
    const startDateObj = new Date(start);
    const week1Goal = "Get clear on your brand, audience, and offer so every launch decision later is grounded. Train your HQ GPT to think like you and your business.";
    const week1Tasks = [
      'Define Your Brand Foundations - Use the YBG GPT to define your brand voice',
      'Clarify your brand story',
      'Define your ideal client',
      'Create your Business Brand & Brand Essence',
      'Train your HQ GPT - Feed your brand foundations into your HQ GPT',
      'Use the Offer Architect GPT to define your offer',
      'Get clear on the transformation your paid offer delivers',
      'Define Your Core Teaching Topic - Identify the core idea you will teach',
      'Clarify the main outcome people experience through this teaching',
      'Identify 3 to 5 key points, shifts, or concepts that support this outcome',
      'Draft Your Event Promise - Translate your core teaching topic into a tangible outcome',
      'Identify the Content Gap - Decide what will be taught during the event vs. reserved for paid offer',
      'Set Up Your Launch Project inside of ChatGPT/Claude - Feed all your foundations into your HQ GPT'
    ];

    return week1Tasks.map((task, index) => ({
      id: `1-${index}`,
      phase: 'Brand, Audience, and Offer Foundations',
      goal: week1Goal,
      task: task,
      week: 1,
      dueDate: startDateObj.toISOString().split('T')[0],
      completed: false
    }));
  };

  const generateCompletePlan = (type, start, launchEvent, customDesc) => {
    const startDateObj = new Date(start);
    
    const weeklyThemes = [
      { week: 1, theme: 'Brand, Audience, and Offer Foundations' },
      { week: 2, theme: 'Lock in Your Launch Plan' },
      { week: 3, theme: 'Build Visibility with Messaging + Content' },
      { week: 4, theme: 'Emails + Sales Funnel Pages' },
      { week: 5, theme: type === 'challenge' ? 'Challenge Prep + Confidence Boost' : type === 'video' ? 'Video Series Prep + Confidence Boost' : 'Launch Event Prep + Confidence Boost' },
      { week: 6, theme: 'Catch Your Breath Week' },
      { week: 7, theme: 'Launch Week' },
      { week: 8, theme: 'Post Launch Cleanup' },
      { week: 9, theme: 'Debrief & Celebrate' }
    ];

    // Gail's Complete Webinar Launch Framework
    const tasksByType = {
      webinar: {
        1: {
          goal: "Get clear on your brand, audience, and offer so every launch decision later is grounded. Train your HQ GPT to think like you and your business.",
          tasks: [
            'Define Your Brand Foundations - Use the YBG GPT to define your brand voice',
            'Clarify your brand story',
            'Define your ideal client',
            'Create your Business Brand & Brand Essence',
            'Train your HQ GPT - Feed your brand foundations into your HQ GPT',
            'Use the Offer Architect GPT to define your offer',
            'Get clear on the transformation your paid offer delivers',
            'Define Your Core Teaching Topic - Identify the core idea you will teach that leads into your paid offer',
            'Clarify the main outcome people experience through this teaching',
            'Identify 3 to 5 key points, shifts, or concepts that support this outcome',
            'Draft Your Event Promise - Translate your core teaching topic into a tangible outcome for your launch event',
            'Keep this at a draft level for now',
            'Identify the Content Gap - Decide what will be taught during the event',
            'Decide what is intentionally reserved for the paid offer',
            'Set Up Your Launch Project inside of ChatGPT/Claude - Feed all your foundations into your HQ GPT'
          ]
        },
        2: {
          goal: "Choose and commit to your launch type and event structure, and set up the essential registration flow so you can start promoting with confidence.",
          tasks: [
            'Choose Your Launch Type - Use the Launch Matchmaker GPT to select your launch format',
            'Confirm it fits your audience, offer, and capacity',
            'Confirm Your Launch Timeline - Choose your event date',
            'Decide if you are running a single event or multiple sessions',
            'Confirm cart open and close dates',
            'Define Your Event Structure - Decide if the event is live, live plus replay, or replay limited',
            'Decide the length and delivery style of the event',
            'Refine Your Event Promise and Transformation - Refine your draft event promise from Week 1',
            'Confirm the specific outcome attendees will experience',
            'Define Your Webinar Event Title and Hook - Create a compelling event title',
            'Define the hook that attracts the right people',
            'Ensure alignment with your paid offer',
            'Confirm the Content Gap and Offer Bridge - Re-confirm what is taught in the event',
            'Re-confirm what is reserved for the paid offer',
            'Define how the event transitions into your offer',
            'Choose Your Webinar Event Platform - Choose the platform you will use to host the event',
            'Create Event Links',
            'Build Your Webinar Registration Flow - Create the event inside your platform',
            'Build the event landing page',
            'Set up the registration form',
            'Create the confirmation page',
            'Set Up Essential Webinar Event Emails - Create the confirmation email',
            'Create reminder emails',
            'Optional: Think about live show up Bonuses and Incentives',
            'Add link to all visible website pages/Social Media accounts'
          ]
        },
        3: {
          goal: "Start creating awareness and momentum for your launch event by clearly communicating what it is, who it's for, and why it matters.",
          tasks: [
            'Clarify Your Core Launch Message - Use your Messaging GPT to articulate the main message for your launch event',
            'Clarify who this event is for and what problem it helps solve',
            'Ensure the message aligns with your event promise and paid offer',
            'Write Your Webinar Promotional Emails - Create your webinar promo email sequence to encourage sign ups',
            'Focus on clarity, relevance, and future outcome',
            'Create Social Content to Promote Your Event - Write social media posts that invite people to your event',
            'Focus on explaining the problem, the promise, and the transformation',
            'Keep content simple and repeatable',
            'Schedule and Start Sharing Your Content - Schedule your promotional emails',
            'Begin sharing your social content consistently',
            'Update your current assets with Webinar details - Update homepage with webinar announcement',
            'Update Facebook page/group banners',
            'Add the Registration button to the Facebook page',
            'Update the Instagram Bio link to the registration page',
            'Optional: Explore Paid Ads (If You Have Capacity) - Decide if paid ads make sense for this launch',
            'If yes, draft simple ad copy using GPT'
          ]
        },
        4: {
          goal: "Set up your sales funnel so people can move cleanly from your launch event into your paid offer.",
          tasks: [
            'Build the Sales Page for Your Paid Offer - Create your sales page',
            'Ensure clear alignment between your event promise and the offer',
            'Build Your Confirmation Page - Create or finalise the post-purchase confirmation page',
            'Include what to expect and next steps',
            'Create Your Checkout - Build your checkout page',
            'Connect it to your sales page',
            'Create Your Onboarding Email - Write an onboarding or welcome email for new buyers',
            'Detail when the program will begin and any next steps they need to take',
            'Test your full sales funnel - Create 100% off coupon and check all aspects of your funnel is working',
            'Create Your Sales Email Sequence - Write your cart open and follow up sales emails',
            'Focus on clarity, value, and urgency'
          ]
        },
        5: {
          goal: "Prepare your launch event so you feel confident, clear, and supported going into delivery.",
          tasks: [
            'Prepare Your Event Slides - Create your slide deck for the launch event',
            'Ensure slides support clarity, not overload',
            'Create Your Talk Track and Event Flow - Outline what you will say and in what order',
            'Define the flow from teaching to transition',
            'Plan Your Q&A Structure - Decide how and when questions will be handled',
            'Prepare boundaries for off-topic questions',
            'Prepare Objection Handling - Identify common objections',
            'Decide how you will address them during or after the event',
            'Prepare Your CTAs and Offer Transition - Decide when and how you will introduce your paid offer',
            'Clarify what you want people to do next',
            'Design Your Event Workbook or Action Items - Create a simple workbook or action steps for attendees',
            'Prepare Your Replay Hub - Ensure your replay page is ready',
            'Confirm how and when the replay will be shared',
            'Decide on Live Only Bonuses (Optional) - Decide if you will offer any live only bonuses',
            'Decide how and when they will be revealed',
            'Practice Your Delivery - Run through your event at least once',
            'Adjust timing and flow if needed',
            'Final Tech Test - Test slides, sound, screen share, and links'
          ]
        },
        6: {
          goal: "Create space to review, integrate, and steady yourself before launch week.",
          tasks: [
            'Final Tech Walkthrough - Walk through your full tech setup from registration to replay',
            'Confirm everything behaves as expected',
            'Read Through All Emails - Read all launch-related emails in order',
            'Check tone, timing, and clarity',
            'Experience the Webinar as a Participant - Walk through your webinar from start to finish as if you were attending',
            'Notice pacing, clarity, and transitions',
            'Check Links, Timers, and Automations - Click every link',
            'Check timers and deadlines',
            'Confirm automations fire correctly',
            'Make Final Adjustments - Adjust anything that feels unclear or off',
            'Keep changes small and intentional'
          ]
        },
        7: {
          goal: "Deliver your launch event, open your cart, and invite people to work with you.",
          tasks: [
            'Open Your Cart - Open enrollment for your paid offer',
            'Monitor Reminder Emails - Ensure reminder emails are sent correctly',
            'Spot check delivery and timing',
            'Run Your Launch Event - Deliver your webinar as planned',
            'Publish the Replay with CTA - Load the replay onto your replay page',
            'Ensure the call to action is clear and visible',
            'Send Your Replay Email - Send the replay email to registrants',
            'Send the replay email to full list (optional)',
            'Send Sales emails and Follow Up - Send your sales and follow up emails as scheduled',
            'Engage with Your Audience - Respond to DMs and comments',
            'Support questions and conversations',
            'Track Attendance and Sales - Monitor registrations, attendance, and sales'
          ]
        },
        8: {
          goal: "Close down your webinar launch cleanly and reset your ecosystem so it reflects what is currently available.",
          tasks: [
            'Remove Webinar Promotion from Your Homepage - Remove banners, buttons, or featured sections promoting the webinar',
            'Update Blog Posts and Pages - Remove or update any blog posts or pages linking to the webinar registration',
            'Set Redirects After the Event Ends - Redirect the webinar registration page to your sales page or relevant next step (waitlist)',
            'Remove Limited Time Content - Remove time-sensitive bonuses or messaging',
            'Close down any expired offers'
          ]
        },
        9: {
          goal: "Reflect on your launch, capture what you've learned, and consciously close this chapter before moving forward.",
          tasks: [
            'Review Your Launch Performance - Review registrations, attendance, and sales',
            'Notice patterns without judgment',
            'Reflect on What Worked and What Didn\'t - Identify what felt aligned and effective',
            'Identify what felt heavy, unclear, or unnecessary',
            'Complete the Launch Debrief - Use the Launch Debrief GPT to guide your reflection',
            'Capture insights, lessons, and ideas for improvement',
            'Decide What to Keep, Change, or Drop - Decide what you would repeat',
            'Decide what you would tweak',
            'Decide what you would not do again',
            'Celebrate Completing Your Launch - Acknowledge the work you\'ve done',
            'Celebrate showing up and following through'
          ]
        }
      },
      challenge: {
        1: {
          goal: "Get clear on your brand, audience, and offer so every launch decision later is grounded. Train your HQ GPT to think like you and your business.",
          tasks: [
            'Define Your Brand Foundations - Use the YBG GPT to define your brand voice',
            'Clarify your brand story',
            'Define your ideal client',
            'Create your Business Brand & Brand Essence',
            'Train your HQ GPT - Feed your brand foundations into your HQ GPT',
            'Use the Offer Architect GPT to define your offer',
            'Get clear on the transformation your paid offer delivers',
            'Define Your Core Teaching Topic - Identify the core idea you will teach that leads into your paid offer',
            'Clarify the main outcome people experience through this teaching',
            'Identify 3 to 5 key points, shifts, or concepts that support this outcome',
            'Draft Your Event Promise - Translate your core teaching topic into a tangible outcome for your launch event',
            'Keep this at a draft level for now',
            'Identify the Content Gap - Decide what will be taught during the event',
            'Decide what is intentionally reserved for the paid offer',
            'Set Up Your Launch Project inside of ChatGPT/Claude - Feed all your foundations into your HQ GPT'
          ]
        },
        2: {
          goal: "Choose and commit to your launch type and challenge structure, and set up the essential registration flow so you can start promoting with confidence.",
          tasks: [
            'Choose Your Launch Type - Use the Launch Matchmaker GPT to select your launch format',
            'Confirm it fits your audience, offer, and capacity',
            'Confirm Your Launch Timeline - Choose your challenge start date',
            'Decide if this is a 3 day or 5 day challenge',
            'Confirm cart open and close dates',
            'Define Your Challenge Structure - Decide how the challenge will be delivered',
            'Define the outcome for each challenge day',
            'Refine Your Event Promise and Transformation - Refine your draft event promise from Week 1',
            'Confirm the overall outcome participants will experience by the end of the challenge',
            'Define Your Challenge Title and Hook - Create a compelling challenge title',
            'Define the hook that attracts the right people',
            'Ensure alignment with your paid offer',
            'Confirm the Content Gap and Offer Bridge - Re-confirm what is taught during the challenge',
            'Re-confirm what is reserved for the paid offer',
            'Define how the challenge transitions into your offer',
            'Choose Your Challenge Delivery Platform - Choose the platform you will use to host the challenge',
            'Choose your email delivery platform',
            'Create all challenge Links',
            'Build Your Challenge Registration Flow - Create the challenge inside your platform',
            'Build the challenge landing page',
            'Set up the registration form',
            'Create the confirmation page',
            'Set Up Essential Challenge Emails - Create the confirmation email',
            'Create reminder emails',
            'Create Your Facebook Group (If Using One) - Create the FB group',
            'Decide when the group opens',
            'Decide when the group closes and will be archived',
            'Optional: Think about live show up Bonuses and Incentives',
            'Add link to all visible website pages/Social Media accounts'
          ]
        },
        3: {
          goal: "Start creating awareness and momentum for your challenge by clearly communicating what it is, who it's for, and why it matters.",
          tasks: [
            'Clarify Your Core Launch Message - Use your Messaging GPT to articulate the main message for your challenge',
            'Clarify who this challenge is for and what problem it helps solve',
            'Ensure the message aligns with your challenge promise and paid offer',
            'Write Your Challenge Promotional Emails - Create your promo email sequence to encourage sign ups',
            'Focus on clarity, relevance, and future outcome',
            'Create Social Content to Promote Your Challenge - Write social media posts that invite people to your challenge',
            'Focus on explaining the problem, the promise, and the transformation',
            'Keep content simple and repeatable',
            'Schedule and Start Sharing Your Content - Schedule your promotional emails',
            'Begin sharing your social content consistently',
            'Update your current assets with Challenge details - Update homepage with challenge announcement',
            'Update Facebook page/group banners',
            'Add the Registration button to the Facebook page',
            'Update the Instagram Bio link to the registration page',
            'Plan Your Daily Challenge Email Rhythm (plan don\'t write yet) - Outline daily reminder emails',
            'Outline daily replay emails',
            'Outline homework emails if applicable',
            'Optional: Explore Paid Ads (If You Have Capacity) - Decide if paid ads make sense for this launch',
            'If yes, draft simple ad copy using GPT'
          ]
        },
        4: {
          goal: "Set up your sales funnel so people can move cleanly from your challenge into your paid offer.",
          tasks: [
            'Build the Sales Page for Your Paid Offer - Create your sales page',
            'Ensure clear alignment between your event promise and the offer',
            'Build Your Confirmation Page - Create or finalise the post-purchase confirmation page',
            'Include what to expect and next steps',
            'Create Your Checkout - Build your checkout page',
            'Connect it to your sales page',
            'Create Your Onboarding Email - Write an onboarding or welcome email for new buyers',
            'Detail when the program will begin and any next steps they need to take',
            'Test your full sales funnel - Create 100% off coupon and check all aspects of your funnel is working',
            'Create Your Sales Email Sequence - Write your cart open and follow up sales emails',
            'Focus on clarity, value, and urgency',
            'Create Your Daily Challenge Emails - Write daily reminder emails',
            'Write daily replay emails',
            'Write homework emails if applicable'
          ]
        },
        5: {
          goal: "Prepare your challenge so you feel confident, clear, and supported going into delivery.",
          tasks: [
            'Prepare Daily Challenge Teaching Assets - Create your slide deck/teaching assets for the challenge',
            'Ensure assets support clarity, not overload',
            'Create Your Daily Flow and Talk Track - Outline what happens each day',
            'Define how teaching transitions to the offer',
            'Plan Your Q&A Structure - Decide how and when questions will be handled',
            'Prepare boundaries for off-topic questions',
            'Prepare Engagement Prompts - Create daily FB group prompts if using a group',
            'Prepare Objection Handling - Identify common objections',
            'Decide how you will address them during the challenge',
            'Prepare Your CTAs and Offer Transition - Decide when and how you will introduce your paid offer',
            'Clarify what you want people to do next',
            'Design Your Challenge Workbook or Action Items - Create a simple workbook or action steps for attendees',
            'Prepare Your Replay Hub - Set up a central place for all replays',
            'Confirm how long members have access to the hub',
            'Decide on Live Only Bonuses (Optional) - Decide if you will offer any live only bonuses',
            'Decide how and when they will be revealed',
            'Practice Your Delivery - Run through your challenge material + pitch',
            'Adjust timing and flow if needed',
            'Final Tech Test - Test slides, sound, screen share, and links'
          ]
        },
        6: {
          goal: "Create space to review, integrate, and steady yourself before launch week.",
          tasks: [
            'Final Tech Walkthrough - Walk through your full tech setup from registration to replay',
            'Confirm everything behaves as expected',
            'Read Through All Emails - Read all launch-related emails in order',
            'Check tone, timing, and clarity',
            'Experience the Challenge as a Participant - Walk through your challenge from start to finish as if you were attending',
            'Notice pacing, clarity, and transitions',
            'Check Links, Timers, and Automations - Click every link',
            'Check timers and deadlines',
            'Confirm automations fire correctly',
            'Make Final Adjustments - Adjust anything that feels unclear or off',
            'Keep changes small and intentional'
          ]
        },
        7: {
          goal: "Deliver your challenge, open your cart, and invite people to work with you.",
          tasks: [
            'Open Your Cart - Open enrollment for your paid offer',
            'Monitor Reminder Emails - Ensure reminder emails are sent correctly',
            'Spot check delivery and timing',
            'Deliver Your 5 Day Challenge - Deliver daily content',
            'Engage in the FB group',
            'Respond to questions',
            'Send Reminder emails each day',
            'Publish the Replay with CTA - Load the replays onto your replay page',
            'Ensure the call to action is clear and visible',
            'Send Your Replay Email - Send the replay email to registrants each day',
            'Send Sales emails and Follow Up - Send your sales and follow up emails as scheduled',
            'Engage with Your Audience - Respond to DMs and comments',
            'Support questions and conversations',
            'Track Attendance and Sales - Monitor registrations, attendance, and sales'
          ]
        },
        8: {
          goal: "Close down your challenge launch cleanly and reset your ecosystem so it reflects what is currently available.",
          tasks: [
            'Remove Challenge Promotion from Your Homepage - Remove banners, buttons, or featured sections promoting the challenge',
            'Update Blog Posts and Pages - Remove or update any blog posts or pages linking to the challenge registration',
            'Set Redirects After the Event Ends - Redirect the challenge registration page to your sales page or relevant next step (waitlist)',
            'Remove Limited Time Content - Remove time-sensitive bonuses or messaging',
            'Close down any expired offers',
            'Close and Archive the Facebook Group - Communicate closing date',
            'Archive the group'
          ]
        },
        9: {
          goal: "Reflect on your launch, capture what you've learned, and consciously close this chapter before moving forward.",
          tasks: [
            'Review Your Launch Performance - Review registrations, attendance, and sales',
            'Notice patterns without judgment',
            'Reflect on What Worked and What Didn\'t - Identify what felt aligned and effective',
            'Identify what felt heavy, unclear, or unnecessary',
            'Complete the Launch Debrief - Use the Launch Debrief GPT to guide your reflection',
            'Capture insights, lessons, and ideas for improvement',
            'Decide What to Keep, Change, or Drop - Decide what you would repeat',
            'Decide what you would tweak',
            'Decide what you would not do again',
            'Celebrate Completing Your Launch - Acknowledge the work you\'ve done',
            'Celebrate showing up and following through'
          ]
        }
      },
      video: {
        1: {
          goal: "Get clear on your brand, audience, and offer so every launch decision later is grounded. Train your HQ GPT to think like you and your business.",
          tasks: [
            'Define Your Brand Foundations - Use the YBG GPT to define your brand voice',
            'Clarify your brand story',
            'Define your ideal client',
            'Create your Business Brand & Brand Essence',
            'Train your HQ GPT - Feed your brand foundations into your HQ GPT',
            'Use the Offer Architect GPT to define your offer',
            'Get clear on the transformation your paid offer delivers',
            'Define Your Core Teaching Topic - Identify the core idea you will teach that leads into your paid offer',
            'Clarify the main outcome people experience through this teaching',
            'Identify 3 to 5 key points, shifts, or concepts that support this outcome',
            'Draft Your Event Promise - Translate your core teaching topic into a tangible outcome for your launch event',
            'Keep this at a draft level for now',
            'Identify the Content Gap - Decide what will be taught during the event',
            'Decide what is intentionally reserved for the paid offer',
            'Set Up Your Launch Project inside of ChatGPT/Claude - Feed all your foundations into your HQ GPT'
          ]
        },
        2: {
          goal: "Choose and commit to your launch type and video series structure, and set up the essential registration and access flow so you can start promoting with confidence.",
          tasks: [
            'Choose Your Launch Type - Use the Launch Matchmaker GPT to select your launch format',
            'Confirm it fits your audience, offer, and capacity',
            'Confirm Your Launch Timeline - Choose your series start date',
            'Decide how many videos will be released',
            'Decide release cadence (daily, every second day, etc.)',
            'Confirm cart open and close dates',
            'Define Your Video Series Structure - Decide how many videos are included',
            'Define the outcome for each video',
            'Decide if videos are time limited or remain available',
            'Refine Your Event Promise and Transformation - Refine your draft event promise from Week 1',
            'Confirm the specific outcome viewers will experience by the end of the series',
            'Define Your Video Series Title and Hook - Create a compelling series title',
            'Define the hook that attracts the right people',
            'Ensure alignment with your paid offer',
            'Confirm the Content Gap and Offer Bridge - Re-confirm what is taught in the free videos',
            'Re-confirm what is reserved for the paid offer',
            'Define how the event transitions into your offer',
            'Choose Your Video Hosting and Delivery Platforms - Choose where videos will be hosted',
            'Decide how access is delivered (email links, login, unlock schedule)',
            'Build Your Video Series Registration Flow - Create the series inside your platform',
            'Build the series landing pages',
            'Set up the registration form',
            'Create the confirmation page',
            'Set Up Essential Video Series Emails - Create the confirmation email',
            'Create series release reminder emails',
            'Optional: Decide on Live Q&A Support - Decide if you will run optional live Q&A sessions',
            'Decide frequency, duration, and platform',
            'Decide if replays will be shared',
            'Add link to all visible website pages/Social Media accounts'
          ]
        },
        3: {
          goal: "Start creating awareness and momentum for your video series by clearly communicating what it is, who it's for, and why it matters.",
          tasks: [
            'Clarify Your Core Launch Message - Use your Messaging GPT to articulate the main message for your video series',
            'Clarify who this series is for and what problem it helps solve',
            'Ensure the message aligns with your series promise and paid offer',
            'Write Your Video Series Promotional Emails - Create your video series promo email sequence to encourage sign ups',
            'Focus on clarity, relevance, and future outcome',
            'Create Social Content to Promote Your Video Series - Write social media posts that invite people to your event',
            'Focus on explaining the problem, the promise, and the transformation',
            'Keep content simple and repeatable',
            'Schedule and Start Sharing Your Content - Schedule your promotional emails',
            'Begin sharing your social content consistently',
            'Update your current assets with Video Series details - Update homepage with series announcement',
            'Update Facebook page/group banners',
            'Add the Registration button to the Facebook page',
            'Update the Instagram Bio link to the registration page',
            'Optional: Explore Paid Ads (If You Have Capacity) - Decide if paid ads make sense for this launch',
            'If yes, draft simple ad copy using GPT'
          ]
        },
        4: {
          goal: "Set up your sales funnel so people can move cleanly from your video series into your paid offer.",
          tasks: [
            'Create Your Video Series Delivery Emails - Write video release emails',
            'Write reminder emails',
            'Write replay or catch up emails if applicable',
            'Build the Sales Page for Your Paid Offer - Create your sales page',
            'Ensure clear alignment between your event promise and the offer',
            'Build Your Confirmation Page - Create or finalise the post-purchase confirmation page',
            'Include what to expect and next steps',
            'Create Your Checkout - Build your checkout page',
            'Connect it to your sales page',
            'Create Your Onboarding Email - Write an onboarding or welcome email for new buyers',
            'Detail when the program will begin and any next steps they need to take',
            'Test your full sales funnel - Create 100% off coupon and check all aspects of your funnel is working',
            'Create Your Sales Email Sequence - Write your cart open and follow up sales emails',
            'Focus on clarity, value, and urgency'
          ]
        },
        5: {
          goal: "Prepare your video series so you feel confident, clear, and supported going into delivery.",
          tasks: [
            'Prepare Your Video Content - Record or finalise all videos',
            'Ensure clarity over polish',
            'Create Your Video Flow and Transitions - Define how each video leads to the next',
            'Define how and when the paid offer is introduced',
            'Prepare Optional Live Q&A Sessions - Prepare a loose Q&A structure if running live support',
            'Decide boundaries for questions',
            'Prepare Objection Handling - Identify common objections',
            'Decide how you will address them during or after the event',
            'Prepare Your CTAs and Offer Transition - Decide when and how you will introduce your paid offer',
            'Clarify what you want people to do next',
            'Design Your Event Workbook or Action Items - Create a simple workbook or action steps for attendees',
            'Prepare Your Video Series Pages - Upload your videos to video series pages',
            'Decide on prizes or homework (optional) - Decide if you will offer any prizes',
            'Decide if you will ask them to do homework',
            'Practice the Viewer Experience - Walk through the series as if you were a registrant'
          ]
        },
        6: {
          goal: "Create space to review, integrate, and steady yourself before launch week.",
          tasks: [
            'Final Tech Walkthrough - Walk through your full tech setup from registration to replay',
            'Confirm everything behaves as expected',
            'Read Through All Emails - Read all launch-related emails in order',
            'Check tone, timing, and clarity',
            'Experience the Video Series as a Participant - Walk through your video series from start to finish as if you were attending',
            'Notice pacing, clarity, and transitions',
            'Check Links, Timers, and Automations - Click every link',
            'Check timers and deadlines',
            'Confirm automations fire correctly',
            'Make Final Adjustments - Adjust anything that feels unclear or off',
            'Keep changes small and intentional'
          ]
        },
        7: {
          goal: "Release your video series, open your cart, and invite people to work with you.",
          tasks: [
            'Open Your Cart - Open enrollment for your paid offer',
            'Monitor Reminder Emails - Ensure reminder emails are sent correctly',
            'Spot check delivery and timing',
            'Release Your Video Series - Ensure videos unlock as planned',
            'Monitor access and delivery',
            'Run Optional Live Q&A Sessions (If Chosen) - Host live Q&A sessions',
            'Respond to questions',
            'Send Series Release and Reminder Emails - Send scheduled emails as planned',
            'Send Sales emails and Follow Up - Send your sales and follow up emails as scheduled',
            'Engage with Your Audience - Respond to DMs and comments',
            'Support questions and conversations',
            'Track Attendance and Sales - Monitor registrations, attendance, and sales'
          ]
        },
        8: {
          goal: "Close down your video series launch cleanly and reset your ecosystem so it reflects what is currently available.",
          tasks: [
            'Remove series Promotion from Your Homepage - Remove banners, buttons, or featured sections promoting the series',
            'Update Blog Posts and Pages - Remove or update any blog posts or pages linking to the series registration',
            'Set Redirects After the series Ends - Redirect the video series registration page to your sales page or relevant next step (waitlist)',
            'Remove Limited Time Content - Remove time-sensitive bonuses or messaging',
            'Close down any expired offers'
          ]
        },
        9: {
          goal: "Reflect on your launch, capture what you've learned, and consciously close this chapter before moving forward.",
          tasks: [
            'Review Your Launch Performance - Review registrations, attendance, and sales',
            'Notice patterns without judgment',
            'Reflect on What Worked and What Didn\'t - Identify what felt aligned and effective',
            'Identify what felt heavy, unclear, or unnecessary',
            'Complete the Launch Debrief - Use the Launch Debrief GPT to guide your reflection',
            'Capture insights, lessons, and ideas for improvement',
            'Decide What to Keep, Change, or Drop - Decide what you would repeat',
            'Decide what you would tweak',
            'Decide what you would not do again',
            'Celebrate Completing Your Launch - Acknowledge the work you\'ve done',
            'Celebrate showing up and following through'
          ]
        }
      }
    };

    const selectedTasks = tasksByType[type] || tasksByType.webinar;
    let allTasks = [];
    
    weeklyThemes.forEach(({ week, theme }) => {
      const weekData = selectedTasks[week] || { goal: '', tasks: [] };
      const weekTasks = weekData.tasks;
      const weekGoal = weekData.goal;
      
      weekTasks.forEach((task, taskIndex) => {
        const dueDate = new Date(startDateObj);
        dueDate.setDate(dueDate.getDate() + ((week - 1) * 7));
        
        allTasks.push({
          id: `${week}-${taskIndex}`,
          phase: theme,
          goal: weekGoal,
          task: task,
          week: week,
          dueDate: dueDate.toISOString().split('T')[0],
          completed: false
        });
      });
    });
    
    return allTasks;
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleWeek = (weekNum) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
  };

  const resetPlan = async () => {
    try {
      await window.storage.delete('launch-plan');
    } catch (error) {
      console.log('No saved plan to delete');
    }
    setStartDate('');
    setLaunchType('');
    setLaunchEventDate('');
    setCustomDescription('');
    setTasks([]);
    setHasCompletedWeek1(false);
    setShowDashboard(false);
    setViewMode('current');
    setExpandedWeeks({});
    setShowResetModal(false);
  };

  const clearProgress = () => {
    setTasks(tasks.map(task => ({ ...task, completed: false })));
    setShowClearModal(false);
  };

  const editLaunchDate = () => {
    setNewLaunchDate(launchEventDate);
    setShowEditModal(true);
  };

  const saveLaunchDate = () => {
    if (!newLaunchDate) return;
    setLaunchEventDate(newLaunchDate);
    setShowEditModal(false);
  };

  const exportPlan = () => {
    const exportData = tasks.map(t => 
      `${t.phase} - Week ${t.week} (Due: ${t.dueDate})\n${t.task}\nCompleted: ${t.completed ? 'Yes' : 'No'}\n`
    ).join('\n');
    
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `launch-plan-${launchType || 'week1'}.txt`;
    a.click();
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const getTasksByWeek = () => {
    const byWeek = {};
    tasks.forEach(task => {
      if (!byWeek[task.week]) {
        byWeek[task.week] = [];
      }
      byWeek[task.week].push(task);
    });
    return byWeek;
  };

  const getCurrentWeek = () => {
    const today = new Date();
    const start = new Date(startDate);
    const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceStart / 7) + 1;
    return Math.max(1, Math.min(9, currentWeek));
  };

  const getCatchUpTasks = () => {
    const today = new Date();
    const start = new Date(startDate);
    const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceStart / 7) + 1;
    
    // Get all incomplete tasks from weeks that have already started (but not current week)
    return tasks.filter(task => {
      return task.week < currentWeek && !task.completed;
    });
  };

  const renderWeekCard = (weekNum, weekTasks, isCurrentWeek = false) => {
    const weekCompleted = weekTasks.filter(t => t.completed).length;
    const weekPercent = Math.round((weekCompleted / weekTasks.length) * 100);
    const isExpanded = expandedWeeks[weekNum] !== false;
    const weekTheme = weekTasks[0]?.phase || `Week ${weekNum}`;
    const weekGoal = weekTasks[0]?.goal || '';
    
    const weekStartDate = new Date(startDate);
    weekStartDate.setDate(weekStartDate.getDate() + ((weekNum - 1) * 7));
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    
    const formatDateRange = (start, end) => {
      const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `${startStr} - ${endStr}`;
    };
    
    return (
      <div 
        key={weekNum} 
        className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden transition-all ${
          isCurrentWeek ? 'border-purple-500' : 'border-gray-100'
        }`}
      >
        <div 
          className={`p-4 cursor-pointer ${
            isCurrentWeek 
              ? 'bg-gradient-to-r from-purple-100 to-pink-100' 
              : 'bg-gradient-to-r from-gray-50 to-gray-100'
          }`}
          onClick={() => toggleWeek(weekNum)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {isCurrentWeek && (
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                    CURRENT WEEK
                  </span>
                )}
                <h2 className="text-xl font-bold text-gray-900">Week {weekNum}</h2>
              </div>
              <p className="text-sm text-gray-600 font-medium">{weekTheme}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDateRange(weekStartDate, weekEndDate)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">
                {weekCompleted}/{weekTasks.length}
              </span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${weekPercent}%` }}
                />
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="p-4">
            {weekGoal && (
              <div className="mb-4 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                <h3 className="text-sm font-bold text-purple-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Week {weekNum} Goal
                </h3>
                <p className="text-sm text-gray-700">{weekGoal}</p>
              </div>
            )}
            
            <div className="space-y-3">
              {weekTasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                    task.completed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 mt-1"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-purple-500" />
                    )}
                  </button>
                  <div className="flex-1">
                    <span className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.task}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLockedWeeks = () => {
    return (
      <div className="space-y-4">
        {[2, 3, 4, 5, 6, 7, 8, 9].map(weekNum => (
          <div key={weekNum} className="bg-gray-50 rounded-xl shadow-md border-2 border-gray-200 p-6">
            <div className="flex items-center justify-center gap-3 text-gray-400">
              <Lock className="w-6 h-6" />
              <span className="text-lg font-semibold">Week {weekNum} - Locked</span>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Complete Week 1 and choose your launch format to unlock
            </p>
          </div>
        ))}
      </div>
    );
  };

  // Initial setup screen
  if (!showDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              7-Week AI-Powered Launch Program
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Welcome! Let's get you started with Week 1
            </p>
            <p className="text-sm text-gray-500">
              You'll choose your specific launch format at the end of Week 1
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  When are you starting Week 1?
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Week 1 is all about foundations - works for all launch types!
                </p>
              </div>

              <button
                onClick={generateWeek1Only}
                disabled={!startDate || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading Week 1...
                  </span>
                ) : (
                  'Start Week 1 →'
                )}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your progress saves automatically 💝</p>
          </div>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();
  const tasksByWeek = getTasksByWeek();
  const completedTasks = tasks.filter(t => t.completed).length;
  const currentWeek = getCurrentWeek();
  const displayWeek = focusWeek || currentWeek; // Use manual focus week if set, otherwise current week
  const hasFullPlan = launchType !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 mb-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {hasFullPlan ? launchTypes.find(t => t.value === launchType)?.label : '7-Week Launch Program'}
              </h1>
              <div className="space-y-1 text-purple-100">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="text-lg">Started: {new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                {launchEventDate && (
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span className="text-lg">Launch Event: {new Date(launchEventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowClearModal(true)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
              <button
                onClick={exportPlan}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                className="px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
            <p className="text-lg font-medium text-center">{motivationalQuote}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{hasFullPlan ? `Week ${currentWeek} of 9` : 'Week 1 - Foundation Week'}</span>
              <span className="font-semibold">{completedTasks} of {tasks.length} tasks completed</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-white rounded-full h-4 transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${progress}%` }}
              >
                <span className="text-xs font-bold text-purple-600">{progress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Catch Up List - Show if there are incomplete tasks from past weeks */}
        {(() => {
          const catchUpTasks = getCatchUpTasks();
          
          return catchUpTasks.length > 0 && (
            <div className="max-w-6xl mx-auto mb-6">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setShowCatchUp(!showCatchUp)}
                  className="w-full p-4 flex items-center justify-between hover:bg-amber-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{catchUpTasks.length}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900">Catch Up List</h3>
                      <p className="text-sm text-gray-600">
                        {catchUpTasks.length} {catchUpTasks.length === 1 ? 'task' : 'tasks'} from previous weeks
                      </p>
                    </div>
                  </div>
                  {showCatchUp ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                
                {showCatchUp && (
                  <div className="p-4 bg-white border-t-2 border-amber-200">
                    <p className="text-sm text-gray-600 mb-4">
                      These tasks from past weeks are still incomplete. Catch up when you can!
                    </p>
                    <div className="space-y-2">
                      {catchUpTasks.map(task => (
                        <div
                          key={task.id}
                          className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200"
                        >
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="flex-shrink-0 mt-1"
                          >
                            <Circle className="w-5 h-5 text-amber-600 hover:text-amber-700" />
                          </button>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {task.task}
                              </span>
                              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full whitespace-nowrap">
                                Week {task.week}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* View Toggle - Show always */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              onClick={() => setViewMode('current')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                viewMode === 'current'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Current Week Focus
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-6 py-2 rounded-md font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'full'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              {hasFullPlan ? 'Full 9-Week Timeline' : 'Full Timeline'}
            </button>
          </div>
        </div>

        {/* Week 1 Content */}
        <div className="space-y-6">
          {viewMode === 'current' ? (
            /* Current Week View */
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {hasFullPlan ? `Week ${displayWeek} ${displayWeek === currentWeek ? '- Focus Here' : ''}` : 'Week 1 - Brand, Audience & Offer Foundations'}
                </h2>
                <p className="text-gray-600">
                  {hasFullPlan ? (displayWeek === currentWeek ? 'Complete these tasks to stay on track' : 'Review or complete tasks from this week') : 'Essential for all launch types - complete these first!'}
                </p>
                
                {/* Week Navigation */}
                {hasFullPlan && (
                  <div className="flex justify-center items-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        setFocusWeek(Math.max(1, displayWeek - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={displayWeek === 1}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-lg font-medium transition-colors text-sm"
                    >
                      ← Previous Week
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-semibold text-sm">
                        Week {displayWeek} of 9
                      </span>
                      {displayWeek !== currentWeek && (
                        <button
                          onClick={() => setFocusWeek(null)}
                          className="text-xs text-purple-600 hover:text-purple-800 mt-1 underline"
                        >
                          Return to current week ({currentWeek})
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setFocusWeek(Math.min(9, displayWeek + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={displayWeek === 9}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-lg font-medium transition-colors text-sm"
                    >
                      Next Week →
                    </button>
                  </div>
                )}
              </div>
              {tasksByWeek[displayWeek] && renderWeekCard(displayWeek, tasksByWeek[displayWeek], displayWeek === currentWeek)}
            </div>
          ) : (
            /* Full Timeline View */
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Complete {hasFullPlan ? '9-Week' : ''} Timeline
                </h2>
                <p className="text-gray-600">
                  Click any week to expand and see tasks
                </p>
              </div>
              {tasksByWeek[1] && renderWeekCard(1, tasksByWeek[1], currentWeek === 1)}
            </div>
          )}

          {/* Choose Launch Format Button or Additional Content */}
          {viewMode === 'full' && !hasFullPlan && (
            /* Show locked weeks in Full Timeline view when no plan yet */
            renderLockedWeeks()
          )}
          
          {viewMode === 'full' && hasFullPlan && (
            /* Show all remaining weeks in Full Timeline view once they have full plan */
            Object.entries(tasksByWeek)
              .filter(([week]) => Number(week) > 1)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([week, weekTasks]) => 
                renderWeekCard(Number(week), weekTasks, Number(week) === currentWeek)
              )
          )}

          {/* Choose Launch Format Section - Inline */}
          {!hasFullPlan && (
            <div id="launch-planner-section" className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg border-2 border-purple-300 p-8 mt-6">
              {!showLaunchPlanner ? (
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Ready to Plan Your Launch?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Once you've worked through Week 1, choose your launch format to unlock Weeks 2-9!
                  </p>
                  <button
                    onClick={() => {
                      setShowLaunchPlanner(true);
                      setTimeout(() => {
                        document.getElementById('launch-planner-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 100);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Choose My Launch Format →
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Launch Format</h2>
                      <p className="text-gray-600 text-sm">
                        Select the type of launch you're planning, and we'll generate your customized 9-week roadmap!
                      </p>
                    </div>
                    <button
                      onClick={() => setShowLaunchPlanner(false)}
                      className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
                    >
                      ×
                    </button>
                  </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Launch Type
                  </label>
                  <select
                    value={launchType}
                    onChange={(e) => {
                      setLaunchType(e.target.value);
                      // Auto-fill launch date to 7 weeks from start
                      if (!launchEventDate) {
                        const launch = new Date(startDate);
                        launch.setDate(launch.getDate() + (7 * 7));
                        setLaunchEventDate(launch.toISOString().split('T')[0]);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
                  >
                    <option value="">Select your launch type...</option>
                    {launchTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    When is your launch event?
                  </label>
                  <input
                    type="date"
                    value={launchEventDate}
                    onChange={(e) => setLaunchEventDate(e.target.value)}
                    min={startDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pre-filled to Week 7 (you can adjust)
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLaunchPlanner(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={generateFullLaunchPlan}
                    disabled={!launchType || !launchEventDate || isGenerating}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Full Plan ✨'}
                  </button>
                </div>
              </div>
            </div>
              )}
            </div>
          )}
        </div>

        {/* Other modals (clear, reset) */}
        {showClearModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Clear All Progress?</h2>
              <p className="text-gray-600 mb-6">
                This will uncheck all your tasks but keep your plan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={clearProgress}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700"
                >
                  Clear Progress
                </button>
              </div>
            </div>
          </div>
        )}

        {showResetModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Over?</h2>
              <p className="text-gray-600 mb-6">
                This will completely delete your plan. You'll start fresh from the beginning.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={resetPlan}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaunchAssistant;
