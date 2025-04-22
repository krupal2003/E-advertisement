import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, Button, Typography, Container, AppBar, Grid, Toolbar, Avatar, Paper, 
  useTheme, Card, CardContent, List, ListItem, ListItemText, Divider, Link
} from '@mui/material';
import { 
  LockOpen, PersonAdd, Analytics, Campaign, Group, MonetizationOn,
  Star, Check, ExpandMore, Facebook, Twitter, LinkedIn, Instagram,ArrowForward
} from '@mui/icons-material';
import '../../assets/css/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate=useNavigate();
  const theme = useTheme();
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const fadeInUp = {  // <-- Added this variant
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: "Real-time Analytics",
      description: "Track campaign performance with live metrics and detailed insights."
    },
    {
      icon: <Group sx={{ fontSize: 40 }} />,
      title: "Audience Targeting",
      description: "Reach the right people with our advanced demographic targeting."
    },
    {
      icon: <MonetizationOn sx={{ fontSize: 40 }} />,
      title: "Cost Effective",
      description: "Maximize your ROI with our optimized bidding strategies."
    },
    {
      icon: <Campaign sx={{ fontSize: 40 }} />,
      title: "Multi-Channel",
      description: "Run campaigns across multiple platforms from one dashboard."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      content: "Our ad performance improved by 65% after switching to AdvertisePro. The analytics dashboard is unparalleled.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder, StartupX",
      content: "As a small business, we needed affordable but powerful tools. This platform delivered beyond our expectations.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Media Buyer, BrandWorks",
      content: "The cross-platform management saves us dozens of hours each week. Highly recommended for agencies.",
      rating: 4
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: ["Up to 5 campaigns", "Basic analytics", "Email support", "1 user"],
      recommended: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      features: ["Up to 25 campaigns", "Advanced analytics", "Priority support", "5 users"],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Unlimited campaigns", "Premium analytics", "24/7 support", "Dedicated account manager"],
      recommended: false
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get started?",
      answer: "You can sign up and launch your first campaign in under 10 minutes. Our onboarding process is designed to get you up and running quickly."
    },
    {
      question: "Do you offer free trials?",
      answer: "Yes! We offer a 14-day free trial with full access to all Professional plan features. No credit card required."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. There are no long-term contracts, and you can cancel your subscription at any time."
    },
    {
      question: "Do you support international campaigns?",
      answer: "Yes, our platform supports advertising in over 100 countries with localized currency and language options."
    }
  ];

  return (
    <Box className="content-display-ui">
    {/* Fixed Header */}
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: theme.palette.primary.main,
              color: 'white'
            }}
          >
            AD
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            AdvertisePro
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<LockOpen />}
            sx={{ fontWeight: 600 }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAdd />}
            sx={{ fontWeight: 600 }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

    {/* Scrollable Content */}
    <Box className="main-content">
      {/* Hero Section */}
      <Box sx={{ py: 10, background: theme.palette.primary.main }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 700 }}>
                Revolutionize Your Advertising
              </Typography>
              <Typography variant="h5" component="p" gutterBottom sx={{ color: 'white', mb: 4 }}>
                The all-in-one platform for agencies and advertisers
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ fontWeight: 600 }}
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ color: 'white', borderColor: 'white', fontWeight: 600 }}
                  onClick={() => navigate('/signup')}

                >
                  Live Demo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Dashboard Preview
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10 }}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Powerful Features
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 80, height: 80, mx: 'auto', mb: 3 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            What Our Clients Say
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} color={i < testimonial.rating ? "primary" : "disabled"} />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, background: theme.palette.primary.main }}>
        <Container>
          <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ color: 'white', fontWeight: 700 }}>
              Ready to Get Started?
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ fontWeight: 600, px: 6, mt: 4 }}
            >
              Start Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>

    {/* Footer */}
    <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper' }}>
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} AdvertisePro. All rights reserved.
        </Typography>
      </Container>
    </Box>
  </Box>
  );
};

export default LandingPage;