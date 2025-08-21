<template>
  <section>
    <!-- Loading state -->
    <div v-if="loading" class="loading-container">
      <h2>Loading...</h2>
    </div>

    <!-- Create new profile form -->
    <div v-else-if="newProfile && jobSeeker" class="createProfileForm">
      <h1>Create profile to continue.</h1>
      <div class="form-container">
        <form class="fo" @submit.prevent="createProfile">
          <div class="form-header">
            <div class="profile-image">
              <label for="logo" class="">
                <div class="logocontainer">
                  <img :src="profileImageUrl" alt="Profile Pic">
                  <Icon icon="ri:camera-line" />
                </div>
              </label>
              <input 
                type="file" 
                name="logo" 
                id="logo" 
                class="file-inp" 
                hidden 
                @change="handleImageChange"
                accept="image/*"
              >
            </div>
            <div class="information-provided">
              <div class="fields-filled-already">
                <h4 class="fields-name">Name: </h4>
                <p class="underlined-fields">{{ user.name }}</p>
              </div>
              <div class="fields-filled-already">
                <h4 class="fields-name">Gender: </h4>
                <p class="underlined-fields">{{ user.gender }}</p>
              </div>
              <div class="fields-filled-already">
                <h4 class="fields-name">Account Type: </h4>
                <p class="underlined-fields">{{ user.accountType === "employee" ? "Job Seeker" : "Employer" }}</p>
              </div>
              <div class="fields-to-fill">
                <h4 class="fields-name">Phone Number: </h4>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  id="phoneNumber" 
                  class="inp-phone"
                  v-model="formData.phoneNumber"
                  placeholder="Enter phone number"
                  required
                >
              </div>
            </div>
          </div>
          
          <div class="fill-the-fields">
            <div class="upper-form-fields-small">
              <div class="left">
                <h4 class="fields-name">Location: </h4>
                <select 
                  name="location" 
                  id="location" 
                  class="inp"
                  v-model="formData.location"
                  required
                >
                  <option value="" selected disabled>Select Location</option>
                  <option v-for="(city, index) in cities" :key="index" :value="city">{{ city }}</option>
                </select>
                
                <h4 class="fields-name">Experience Level: </h4>
                <select 
                  name="experienceLevel" 
                  id="experienceLevel" 
                  class="inp"
                  v-model="formData.experienceLevel"
                  required
                >
                  <option value="" selected disabled>Select Experience Level</option>
                  <option v-for="(level, index) in experienceLevels" :key="index" :value="level">{{ level }}</option>
                </select>
              </div>
              
              <div class="right">
                <h4 class="fields-name">Job Type: </h4>
                <select 
                  name="jobType" 
                  id="jobType" 
                  class="inp"
                  v-model="formData.jobType"
                  required
                >
                  <option value="" selected disabled>Select Job Type</option>
                  <option v-for="(type, index) in jobTypes" :key="index" :value="type">{{ type }}</option>
                </select>
                
                <h4 class="fields-name">Skills: </h4>
                <div class="skills-input-container">
                  <input 
                    type="text" 
                    v-model="currentSkill"
                    @keypress="handleSkillKeypress"
                    placeholder="Type skill and press Enter"
                    class="inp skill-input"
                  >
                  <div class="skills-display">
                    <span
                      v-for="(skill, idx) in skillsArray"
                      :key="idx"
                      class="skill-tag"
                    >
                      {{ skill }}
                      <button type="button" @click="removeSkill(idx)" class="remove-skill-btn">&times;</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Hidden input for form submission -->
            <input type="hidden" name="skills" :value="skillsArray.join(',')" id="skills">
          </div>
          
          <div class="about-container">
            <h4 class="fields-name">About:</h4>
            <textarea 
              type="text" 
              name="about" 
              id="about" 
              placeholder="What describes you?" 
              class="about inter"
              v-model="formData.about"
              required
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-p" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Submit' }}
            </button>
          </div>
          
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
    
    <!-- Profile found -->
    <div v-else-if="profileFound && !profileFound.status" class="profile-display">
      <h1>Profile Found</h1>
      <div class="profile-content">
        <div class="profile-header">
          <div class="profile-image-display">
            <img :src="profileFound.profileImage || defaultProfileImage" alt="Profile">
          </div>
          <div class="profile-info">
            <h2>{{ user.name }}</h2>
            <p><strong>Location:</strong> {{ profileFound.location }}</p>
            <p><strong>Experience:</strong> {{ profileFound.experienceLevel }}</p>
            <p><strong>Job Type:</strong> {{ profileFound.jobType }}</p>
          </div>
        </div>
        <div class="profile-details">
          <div class="skills-section">
            <h3>Skills</h3>
            <div class="skills-display">
              <span 
                v-for="skill in profileFound.skills?.split(',')" 
                :key="skill" 
                class="skill-tag readonly"
              >
                {{ skill.trim() }}
              </span>
            </div>
          </div>
          <div class="about-section">
            <h3>About</h3>
            <p>{{ profileFound.about }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Error states -->
    <div v-else-if="profileFound && profileFound.status === 404" class="error-container">
      <h1>Profile Not Found</h1>
      <p>{{ profileFound.message }}</p>
    </div>
    
    <div v-else class="error-container">
      <h1>Error</h1>
      <p>{{ profileFound?.message || 'An unexpected error occurred' }}</p>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { Icon } from '@iconify/vue';

export default {
  props: ['id'],
  name: "Profile",
  components: {
    Icon,
  },
  data() {
    return {
      profileFound: {},
      newProfile: false,
      loading: true,
      user: {},
      jobSeeker: false,
      skillsArray: [],
      currentSkill: '',
      profileImageUrl: '../assets/Opportune.png', // Default image
      isSubmitting: false,
      errorMessage: '',
      formData: {
        phoneNumber: '',
        location: '',
        experienceLevel: '',
        jobType: '',
        about: ''
      },
      cities: [
        "Karachi",
        "Lahore", 
        "Islamabad",
        "Rawalpindi",
        "Faisalabad",
        "Multan",
        "Peshawar",
        "Quetta",
        "Hyderabad",
        "Sialkot"
      ],
      jobTypes: [
        'Remote',
        'On-site', 
        'Both'
      ],
      experienceLevels: [
        'Internee', 
        'Freshy', 
        'Less than year', 
        '1 - 2 years', 
        '2 - 4 years', 
        '5 - 7 years', 
        '7+ years'
      ],
      defaultProfileImage: '../assets/Opportune.png'
    }
  },
  async created() {
    try {
      await this.getCurrentUserInfo();
      await this.getProfileInfo();
    } catch (error) {
      console.error('Initialization error:', error);
      if (error.message.includes('authentication') || error.message.includes('token')) {
        this.handleAuthError();
      } else {
        this.errorMessage = 'Failed to load user data';
      }
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async getCurrentUserInfo() {
      try {
        const res = await axios.get(`https://opportuneaipoweredbackend.vercel.app/api/v1/me`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        this.user = res.data.user;
        this.jobSeeker = this.user.accountType === "employee";
      } catch (err) {
        console.error('User info error:', err.response?.data || err.message);
        if (err.response?.status === 401 || err.response?.data?.message?.includes('token')) {
          throw new Error('authentication');
        }
        throw new Error('Failed to fetch user information');
      }
    },

    async getProfileInfo() {
      try {
        const res = await axios.get(`https://opportuneaipoweredbackend.vercel.app/api/v1/profile/${this.id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        this.profileFound = res.data.profile;
        this.newProfile = false;
        console.log('Profile found:', this.profileFound);
        
      } catch (err) {
        console.log('Profile fetch error:', err);
        
        if (err.response) {
          const status = err.response.status;
          const errorData = err.response.data;
          
          if (status === 401 || errorData.message?.includes('token')) {
            this.handleAuthError();
            return;
          }
          
          if (status === 404) {
            // Profile not found - need to create new profile
            this.newProfile = true;
            this.profileFound = {
              status: 404,
              message: errorData.message || 'Profile not found'
            };
          } else {
            // Other error
            this.newProfile = false;
            this.profileFound = {
              status: status,
              message: errorData.message || 'An error occurred'
            };
          }
        } else {
          // Network error
          this.newProfile = false;
          this.profileFound = {
            status: 500,
            message: 'Network error or server unavailable'
          };
        }
      }
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    handleSkillKeypress(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.addSkill();
      }
    },

    addSkill() {
      const skill = this.currentSkill.trim();
      if (skill && !this.skillsArray.includes(skill)) {
        this.skillsArray.push(skill);
        this.currentSkill = '';
      }
    },

    removeSkill(index) {
      this.skillsArray.splice(index, 1);
    },

    validateForm() {
      const { phoneNumber, location, experienceLevel, jobType, about } = this.formData;
      
      if (!phoneNumber || !location || !experienceLevel || !jobType || !about) {
        this.errorMessage = 'Please fill in all required fields.';
        return false;
      }
      
      if (this.skillsArray.length === 0) {
        this.errorMessage = 'Please add at least one skill.';
        return false;
      }

      this.errorMessage = '';
      return true;
    },

    async createProfile() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        const profileData = {
          ...this.formData,
          skills: this.skillsArray.join(',')
        };

        console.log('Sending profile data:', profileData);

        const res = await axios.post(
          `https://opportuneaipoweredbackend.vercel.app/api/v1/profile/create`, 
          profileData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        
        this.profileFound = res.data.profile;
        this.newProfile = false;
        console.log('Profile created:', this.profileFound);
        
        // Show success message
        this.errorMessage = '';
        
      } catch (err) {
        console.error('Profile creation error:', err);
        console.error('Error response:', err.response?.data);
        
        if (err.response?.status === 401 || err.response?.data?.message?.includes('token')) {
          this.handleAuthError();
        } else {
          this.errorMessage = err.response?.data?.message || 'Failed to create profile. Please try again.';
        }
      } finally {
        this.isSubmitting = false;
      }
    },

    handleAuthError() {
      this.errorMessage = 'Your session has expired. Please log in again.';
      // Redirect to login page after a delay
      setTimeout(() => {
        // Replace with your actual login route
        this.$router.push('/login');
        // Or redirect to login URL
        // window.location.href = '/login';
      }, 2000);
    },

    // Add method to refresh authentication
    async refreshAuth() {
      try {
        // If you have a refresh token endpoint, call it here
        const res = await axios.post(`https://opportuneaipoweredbackend.vercel.app/api/v1/refresh`, {}, {
          withCredentials: true
        });
        
        if (res.data.success) {
          // Retry the failed operation
          await this.getCurrentUserInfo();
          await this.getProfileInfo();
        }
      } catch (error) {
        console.error('Auth refresh failed:', error);
        this.handleAuthError();
      }
    }
  }
}
</script>

<style scoped>
.loading-container {
  text-align: center;
  padding: 2rem;
}

.logocontainer {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.logocontainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.logocontainer .iconify {
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 5px;
  width: 100%;
  height: 35%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logocontainer .iconify:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.fields-name {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.underlined-fields {
  text-decoration: underline;
  font-size: 1rem;
  padding: 4px;
  filter: opacity(0.95);
}

.form-header {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

.createProfileForm {
  width: 70vw;
  margin: 24px auto;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #80808075;
  background: white;
}

.createProfileForm h1 {
  font-size: 2.25rem;
  text-align: center;
  font-weight: 500;
  padding: 16px;
  margin-bottom: 24px;
}

.fields-filled-already {
  display: flex;
  align-items: end;
  gap: 8px;
  margin-bottom: 16px;
}

.fields-to-fill {
  display: flex;
  gap: 8px;
  align-items: end;
}

.inp-phone {
  border: none;
  border-bottom: 1px solid #ededed;
  outline: none;
  font-size: 1rem;
  transition: 0.3s all ease;
  padding: 8px 4px;
}

.inp-phone:focus {
  border-bottom: 1px solid #00A651;
}

.inp {
  font-size: 1rem;
  padding: 8px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ededed;
  outline: none;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.inp:focus {
  border: 1px solid #00A651;
}

.upper-form-fields-small {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.left, .right {
  width: 50%;
}

.skills-input-container {
  width: 100%;
}

.skill-input {
  margin-bottom: 8px;
}

.skills-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.skill-tag {
  background-color: #00A651;
  color: white;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.skill-tag.readonly {
  background-color: #e9ecef;
  color: #495057;
}

.remove-skill-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  margin-left: 4px;
}

.remove-skill-btn:hover {
  color: #ffcccc;
}

.about-container {
  margin: 24px 0;
}

.about {
  width: 100%;
  height: 150px;
  resize: vertical;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ededed;
  outline: none;
  transition: all 0.4s ease;
  border-radius: 8px;
  font-family: inherit;
}

.about:focus {
  border: 1px solid #00A651;
}

.form-actions {
  text-align: center;
  margin: 24px 0;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-p {
  background-color: #00A651;
  color: white;
}

.btn-p:hover:not(:disabled) {
  background-color: #008f45;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 16px;
  padding: 8px;
  background-color: #f8d7da;
  border-radius: 4px;
}

.profile-display {
  max-width: 800px;
  margin: 24px auto;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  background: white;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.profile-image-display {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #00A651;
}

.profile-image-display img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info h2 {
  margin: 0 0 16px 0;
  color: #333;
}

.profile-info p {
  margin: 8px 0;
  color: #666;
}

.skills-section, .about-section {
  margin-bottom: 24px;
}

.skills-section h3, .about-section h3 {
  margin-bottom: 12px;
  color: #333;
}

.about-section p {
  line-height: 1.6;
  color: #555;
}

.error-container {
  text-align: center;
  padding: 2rem;
  color: #dc3545;
}

@media (max-width: 768px) {
  .createProfileForm {
    width: 90vw;
    padding: 16px;
  }
  
  .form-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .upper-form-fields-small {
    flex-direction: column;
  }
  
  .left, .right {
    width: 100%;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>