import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, TrendingUp, Sparkles, Download, RotateCcw } from 'lucide-react';

const LaunchAssistant = () => {
  const [launchType, setLaunchType] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState('');

  // Load saved data from storage on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedPlan = await window.storage.get('launch-plan');
        if (savedPlan && savedPlan.value) {
          const planData = JSON.parse(savedPlan.value);
          setLaunchType(planData.launchType);
          setLaunchDate(planData.launchDate);
          setTasks(planData.tasks);
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
            launchType,
            launchDate,
            tasks
          }));
        } catch (error) {
          console.error('Error saving plan:', error);
        }
      };
      savePlan();
    }
  }, [tasks, launchType, launchDate]);

  // Get motivational quote based on progress
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
    { value: 'challenge', label: '5-Day Challenge Launch' },
    { value: 'email', label: 'Email Sequence Launch' },
    { value: 'evergreen', label: 'Evergreen Funnel' }
  ];

  const generateLaunchPlan = async () => {
    setIsGenerating(true);
    
    // Calculate weeks until launch
    const today = new Date();
    const launch = new Date(launchDate);
    const daysUntil = Math.ceil((launch - today) / (1000 * 60 * 60 * 24));
    const weeksUntil = Math.ceil(daysUntil / 7);

    // Sample framework - this is where YOUR methodology would go
    const samplePlan = generateSamplePlan(launchType, weeksUntil, launchDate);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTasks(samplePlan);
    setShowDashboard(true);
    setIsGenerating(false);
  };

  const generateSamplePlan = (type, weeks, targetDate) => {
    // This would be replaced with actual AI generation using your framework
    // Calculate phase distribution based on available weeks
    const distributeWeeks = (totalWeeks) => {
      if (totalWeeks <= 4) return [1, 1, 1, 1];
      if (totalWeeks <= 6) return [2, 2, 1, 1];
      if (totalWeeks <= 8) return [3, 2, 2, 1];
      return [Math.ceil(totalWeeks * 0.35), Math.ceil(totalWeeks * 0.25), Math.ceil(totalWeeks * 0.25), Math.max(1, totalWeeks - Math.ceil(totalWeeks * 0.35) - Math.ceil(totalWeeks * 0.25) - Math.ceil(totalWeeks * 0.25))];
    };

    const weekDist = distributeWeeks(weeks);

    const basePhases = {
      webinar: [
        { phase: 'Foundation', weeks: weekDist[0] },
        { phase: 'Content Creation', weeks: weekDist[1] },
        { phase: 'Promotion', weeks: weekDist[2] },
        { phase: 'Launch Week', weeks: weekDist[3] }
      ],
      challenge: [
        { phase: 'Planning & Setup', weeks: weekDist[0] },
        { phase: 'Content Development', weeks: weekDist[1] },
        { phase: 'Pre-Launch Buzz', weeks: weekDist[2] },
        { phase: 'Challenge Week', weeks: weekDist[3] }
      ],
      email: [
        { phase: 'Audience Building', weeks: weekDist[0] },
        { phase: 'Sequence Creation', weeks: weekDist[1] },
        { phase: 'Warm-Up Period', weeks: weekDist[2] },
        { phase: 'Launch Sequence', weeks: weekDist[3] }
      ],
      evergreen: [
        { phase: 'Funnel Architecture', weeks: weekDist[0] },
        { phase: 'Asset Creation', weeks: weekDist[1] },
        { phase: 'Tech Setup', weeks: weekDist[2] },
        { phase: 'Testing & Optimization', weeks: weekDist[3] }
      ]
    };

    const tasksByType = {
      webinar: {
        'Foundation': [
          'Define your signature webinar topic and irresistible title',
          'Identify your ideal participant and their core pain point',
          'Craft your webinar promise (the transformation you\'ll deliver)',
          'Map out your webinar framework (teaching + offer structure)',
          'Create your registration page copy and design'
        ],
        'Content Creation': [
          'Build your slide deck with story-driven content',
          'Script your pitch sequence (value > transition > offer)',
          'Create your follow-up email sequence (5-7 emails)',
          'Design your offer slides and bonuses',
          'Record a practice run and refine timing'
        ],
        'Promotion': [
          'Schedule 10+ social media posts about the webinar',
          'Reach out to potential partners for promotion',
          'Create lead magnet to build registration list',
          'Set up webinar reminder email sequence',
          'Go live with ads (if using paid traffic)'
        ],
        'Launch Week': [
          'Send daily reminder emails building excitement',
          'Host live webinar and deliver transformation',
          'Follow up immediately with replay email',
          'Send cart open emails days 1-3',
          'Close cart with urgency sequence',
          'Celebrate and analyze your results!'
        ]
      },
      challenge: {
        'Planning & Setup': [
          'Choose your challenge theme and outcome promise',
          'Design your 5-day journey (what each day delivers)',
          'Set up your challenge delivery platform',
          'Create registration and confirmation pages',
          'Map out your daily live schedule'
        ],
        'Content Development': [
          'Create daily training content and workbooks',
          'Develop daily action steps and accountability prompts',
          'Script your pitch integration throughout the 5 days',
          'Design your offer reveal for Day 5',
          'Build bonus resources and challenge support materials'
        ],
        'Pre-Launch Buzz': [
          'Launch challenge registration campaign',
          'Create excitement-building social content',
          'Recruit challenge ambassadors and affiliates',
          'Set up challenge community space',
          'Send welcome sequence to registered participants'
        ],
        'Challenge Week': [
          'Go live Day 1 - build community and momentum',
          'Deliver Days 2-3 with increasing value and connection',
          'Present offer on Day 4 with testimonials',
          'Celebrate wins on Day 5 and open cart',
          'Follow up with non-buyers with special bonuses',
          'Close cart and deliver on your promises!'
        ]
      },
      email: {
        'Audience Building': [
          'Create your lead magnet (aligned with your offer)',
          'Build your opt-in page and thank you sequence',
          'Set up your email platform and segments',
          'Launch lead generation campaign',
          'Engage new subscribers with welcome series'
        ],
        'Sequence Creation': [
          'Write your launch email sequence (minimum 10 emails)',
          'Craft your story-based nurture emails',
          'Create urgency and scarcity elements',
          'Design email templates and graphics',
          'Plan your bonus stack and reveal strategy'
        ],
        'Warm-Up Period': [
          'Send value-packed content emails',
          'Tease the upcoming opportunity',
          'Share transformation stories and case studies',
          'Build anticipation with countdown',
          'Segment engaged vs. cold subscribers'
        ],
        'Launch Sequence': [
          'Send cart open email with full offer details',
          'Share FAQ and objection-handling emails',
          'Deliver mid-cart value and testimonial emails',
          'Send last chance emails with urgency',
          'Close cart and follow up with buyers and non-buyers'
        ]
      },
      evergreen: {
        'Funnel Architecture': [
          'Map your complete funnel journey (awareness to sale)',
          'Design your lead magnet and tripwire offer',
          'Plan your email automation sequences',
          'Outline your sales page structure',
          'Create your funnel success metrics dashboard'
        ],
        'Asset Creation': [
          'Write all email sequences for the funnel',
          'Create your sales page copy and design',
          'Develop your lead magnet and delivery system',
          'Record any video content needed',
          'Design graphics and funnel visuals'
        ],
        'Tech Setup': [
          'Set up email platform automations',
          'Configure landing pages and checkout',
          'Integrate payment processor',
          'Set up tracking and analytics',
          'Create your funnel dashboard'
        ],
        'Testing & Optimization': [
          'Test complete funnel user journey',
          'Review all email deliverability',
          'A/B test key elements',
          'Launch to small test audience',
          'Optimize based on initial data',
          'Go fully live and monitor performance!'
        ]
      }
    };

    const phases = basePhases[type] || basePhases.webinar;
    const phaseTasks = tasksByType[type] || tasksByType.webinar;
    
    let allTasks = [];
    let weekCounter = 1;
    
    phases.forEach((phase, phaseIndex) => {
      const phaseWeeks = phase.weeks;
      const tasksForPhase = phaseTasks[phase.phase] || [];
      const tasksPerWeek = Math.ceil(tasksForPhase.length / phaseWeeks);
      
      tasksForPhase.forEach((task, taskIndex) => {
        const weekInPhase = Math.floor(taskIndex / tasksPerWeek);
        const weekNumber = weekCounter + weekInPhase;
        
        // Calculate due date: start from today and add weeks
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + ((weekNumber - 1) * 7));
        
        allTasks.push({
          id: `${phaseIndex}-${taskIndex}`,
          phase: phase.phase,
          task: task,
          week: weekNumber,
          dueDate: dueDate.toISOString().split('T')[0],
          completed: false
        });
      });
      
      weekCounter += phaseWeeks;
    });
    
    return allTasks.sort((a, b) => a.week - b.week);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const resetPlan = async () => {
    if (window.confirm('Are you sure you want to start over? This will clear your current plan.')) {
      try {
        await window.storage.delete('launch-plan');
      } catch (error) {
        console.log('No saved plan to delete');
      }
      setLaunchType('');
      setLaunchDate('');
      setTasks([]);
      setShowDashboard(false);
    }
  };

  const exportPlan = () => {
    const exportData = tasks.map(t => 
      `${t.phase} - Week ${t.week} (Due: ${t.dueDate})\n${t.task}\nCompleted: ${t.completed ? 'Yes' : 'No'}\n`
    ).join('\n');
    
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `launch-plan-${launchType}.txt`;
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

  const getPhaseProgress = () => {
    const byPhase = {};
    tasks.forEach(task => {
      if (!byPhase[task.phase]) {
        byPhase[task.phase] = { total: 0, completed: 0 };
      }
      byPhase[task.phase].total++;
      if (task.completed) byPhase[task.phase].completed++;
    });
    return byPhase;
  };

  if (!showDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Launch Assistant
            </h1>
            <p className="text-xl text-gray-600">
              Get your personalized day-by-day launch roadmap in 60 seconds
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What type of launch are you planning?
                </label>
                <select
                  value={launchType}
                  onChange={(e) => setLaunchType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
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
                  When do you want to launch?
                </label>
                <input
                  type="date"
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
              </div>

              <button
                onClick={generateLaunchPlan}
                disabled={!launchType || !launchDate || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Your Custom Plan...
                  </span>
                ) : (
                  'Generate My Launch Roadmap ✨'
                )}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your progress saves automatically. Come back anytime! 💝</p>
          </div>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();
  const tasksByWeek = getTasksByWeek();
  const phaseProgress = getPhaseProgress();
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 mb-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {launchTypes.find(t => t.value === launchType)?.label}
              </h1>
              <div className="flex items-center text-purple-100">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-lg">Launch Date: {new Date(launchDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportPlan}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Export Plan"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={resetPlan}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Start Over"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
            <p className="text-lg font-medium text-center">{motivationalQuote}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
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

        {/* Phase Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(phaseProgress).map(([phase, data]) => {
            const phasePercent = Math.round((data.completed / data.total) * 100);
            return (
              <div key={phase} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{phase}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-purple-600">{phasePercent}%</span>
                  <span className="text-xs text-gray-500">{data.completed}/{data.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${phasePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tasks by Week */}
        <div className="space-y-6">
          {Object.entries(tasksByWeek).sort(([a], [b]) => Number(a) - Number(b)).map(([week, weekTasks]) => {
            const weekCompleted = weekTasks.filter(t => t.completed).length;
            const weekPercent = Math.round((weekCompleted / weekTasks.length) * 100);
            
            return (
              <div key={week} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Week {week}</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600">
                        {weekCompleted}/{weekTasks.length} complete
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${weekPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
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
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {task.task}
                          </span>
                          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full whitespace-nowrap">
                            {task.phase}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Celebration */}
        {progress === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-xl p-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-xl">You've completed your entire launch plan! Time to celebrate and launch! 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaunchAssistant;
