const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!email || !password || !role) {
      alert("Please fill out all fields.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);
  
        if (role === 'mechanic') {
          navigate(`/dashboard/mechanic`);
        } else if (role === 'electrician') {
          navigate(`/dashboard/electrician`);
        }
      } else {
        alert(data.detail); // Show error message from backend
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again later.');
    }
  
    setLoading(false);
  };
  