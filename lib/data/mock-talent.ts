
export interface PortfolioItem {
    id: string;
    title: string;
    type: "image" | "video";
    url: string;
    description: string;
    tags: string[];
    size: "small" | "medium" | "large" | "tall" | "wide";
}

export interface TalentProfile {
    id: number;
    name: string;
    major: string;
    location: string;
    skills: string[];
    bio: string;
    avatarUrl?: string;
    experience?: {
        role: string;
        company: string;
        duration: string;
        description: string;
    }[];
    education?: {
        degree: string;
        school: string;
        year: string;
    }[];
    projects?: {
        name: string;
        description: string;
        role: string;
        status: "In Progress" | "Completed" | "On Hold";
        link?: string;
    }[];
    portfolio?: PortfolioItem[];
    isUser?: boolean;
}

export const MOCK_TALENT: TalentProfile[] = [
    {
        id: 1,
        name: "Alice Smith",
        major: "Computer Science",
        location: "Stockholm, Sweden",
        skills: ["React", "TypeScript", "Node.js"],
        bio: "Passionate full-stack developer with a focus on building scalable web applications. I love solving complex problems and learning new technologies.",
        experience: [
            {
                role: "Frontend Developer Intern",
                company: "Tech Solutions AB",
                duration: "Summer 2024",
                description: "Developed and maintained user interfaces using React and Redux. Collaborated with designers to implement new features."
            }
        ],
        education: [
            {
                degree: "B.Sc. Computer Science",
                school: "KTH Royal Institute of Technology",
                year: "2022 - 2025"
            }
        ],
        projects: [
            {
                name: "EcoTrack",
                description: "A mobile app for tracking personal carbon footprint.",
                role: "Lead Developer",
                status: "In Progress",
                link: "#"
            },
            {
                name: "KTH Course Review",
                description: "Web platform for students to review courses anonymously.",
                role: "Full Stack Developer",
                status: "Completed",
                link: "#"
            }
        ],
        portfolio: [
            {
                id: "1",
                title: "EcoTrack Dashboard",
                type: "image",
                url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
                description: "The main dashboard for the EcoTrack app, showing daily carbon usage graphs and tips.",
                tags: ["React Native", "UI Design"],
                size: "large"
            },
            {
                id: "2",
                title: "Login Flow",
                type: "image",
                url: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop",
                description: "Secure and smooth login authentication screens.",
                tags: ["UX", "Security"],
                size: "tall"
            },
            {
                id: "3",
                title: "Carbon Calculator",
                type: "image",
                url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
                description: "Complex form for calculating carbon footprint based on daily activities.",
                tags: ["Forms", "Logic"],
                size: "medium"
            },
            {
                id: "4",
                title: "Course Review UI",
                type: "image",
                url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
                description: "Clean card-based layout for viewing course reviews.",
                tags: ["Web", "Design"],
                size: "wide"
            },
            {
                id: "5",
                title: "Code Snippet",
                type: "image",
                url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
                description: "Optimized algorithm for data processing.",
                tags: ["Code", "Backend"],
                size: "small"
            }
        ]
    },
    {
        id: 2,
        name: "Bob Jones",
        major: "Interaction Design",
        location: "Kista, Sweden",
        skills: ["Figma", "UI/UX", "Prototyping"],
        bio: "Creative interaction designer dedicated to crafting intuitive and engaging user experiences. Proficient in Figma and prototyping tools.",
        experience: [
            {
                role: "UX Design Intern",
                company: "Creative Agency",
                duration: "Spring 2024",
                description: "Conducted user research and created wireframes for mobile applications."
            }
        ],
        education: [
            {
                degree: "M.Sc. Interactive Media Technology",
                school: "KTH Royal Institute of Technology",
                year: "2023 - 2025"
            }
        ],
        projects: [
            {
                name: "Smart Home Dashboard",
                description: "UI/UX design for a centralized smart home control panel.",
                role: "UX Designer",
                status: "Completed",
                link: "#"
            }
        ]
    },
    {
        id: 3,
        name: "Charlie Brown",
        major: "Electrical Engineering",
        location: "Stockholm, Sweden",
        skills: ["IoT", "Embedded C", "PCB Design"],
        bio: "Electrical engineering student with a strong interest in IoT and embedded systems. Experienced in PCB design and microcontroller programming.",
        experience: [
            {
                role: "Embedded Systems Intern",
                company: "IoT Innovations",
                duration: "Summer 2023",
                description: "Worked on firmware development for smart home devices."
            }
        ],
        education: [
            {
                degree: "B.Sc. Electrical Engineering",
                school: "KTH Royal Institute of Technology",
                year: "2021 - 2024"
            }
        ],
        projects: [
            {
                name: "Automated Greenhouse",
                description: "IoT system for monitoring and controlling greenhouse environment.",
                role: "Hardware Engineer",
                status: "In Progress"
            }
        ]
    },
    {
        id: 4,
        name: "Diana Prince",
        major: "Business Administration",
        location: "Solna, Sweden",
        skills: ["Marketing", "Strategy", "Public Speaking"],
        bio: "Driven business student with a knack for marketing strategy and communication. Eager to apply my skills in a dynamic business environment.",
        experience: [
            {
                role: "Marketing Assistant",
                company: "Global Corp",
                duration: "Part-time 2023-2024",
                description: "Assisted in coordinating marketing campaigns and social media management."
            }
        ],
        education: [
            {
                degree: "B.Sc. Business and Economics",
                school: "Stockholm School of Economics",
                year: "2022 - 2025"
            }
        ],
        projects: [
            {
                name: "Market Expansion Strategy",
                description: "Developed a go-to-market strategy for a local startup.",
                role: "Strategist",
                status: "Completed"
            }
        ]
    },
    {
        id: 5,
        name: "Evan Wright",
        major: "Data Science",
        location: "Stockholm, Sweden",
        skills: ["Python", "Machine Learning", "SQL"],
        bio: "Data science enthusiast with a solid foundation in machine learning and statistical analysis. I enjoy turning data into actionable insights.",
        experience: [
            {
                role: "Data Analyst Intern",
                company: "Data Insights",
                duration: "Summer 2024",
                description: "Analyzed large datasets to identify trends and patterns using Python and SQL."
            }
        ],
        education: [
            {
                degree: "M.Sc. Machine Learning",
                school: "KTH Royal Institute of Technology",
                year: "2023 - 2025"
            }
        ],
        projects: [
            {
                name: "Stock Price Predictor",
                description: "ML model to predict stock price movements based on historical data.",
                role: "Data Scientist",
                status: "Completed"
            }
        ]
    },
    {
        id: 6,
        name: "Fiona Green",
        major: "Architecture",
        location: "Stockholm, Sweden",
        skills: ["3D Modeling", "AutoCAD", "Rendering"],
        bio: "Aspiring architect with a passion for sustainable design and urban planning. Skilled in 3D modeling and architectural visualization.",
        experience: [
            {
                role: "Architectural Intern",
                company: "Urban Design Studio",
                duration: "Summer 2023",
                description: "Assisted senior architects in drafting plans and creating 3D models."
            }
        ],
        education: [
            {
                degree: "B.Sc. Architecture",
                school: "KTH Royal Institute of Technology",
                year: "2020 - 2025"
            }
        ],
        projects: [
            {
                name: "Sustainable Housing Complex",
                description: "Design proposal for an eco-friendly residential complex.",
                role: "Architect",
                status: "In Progress"
            }
        ]
    }
]
