import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Animated, TouchableOpacity, ScrollView, Dimensions, Easing, Linking, TextInput, FlatList, Modal} from 'react-native';


function AnimatedLogo({ onLogoAnimationComplete }) {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      onLogoAnimationComplete();
    });
  }, []);

  const animatedStyles = {
    opacity: animation,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1.5, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.logoContainer, animatedStyles]}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
    </Animated.View>
  );
}

class HomeScreen extends React.Component {
  logoAnimation = new Animated.Value(0);

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    Animated.loop(
      Animated.timing(this.logoAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  handleLogoPress = () => {
    Animated.timing(this.logoAnimation).stop();
  };

  render() {
    const logoStyle = {
      transform: [
        {
          rotate: this.logoAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleLogoPress}>
          <Animated.Image
            style={[styles.logo, logoStyle]}
            source={require('./assets/logo.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


const CardNews = ({ image, title, content }) => (
  <View style={styles.cardContainer}>
    <Image source={image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardContent}>{content}</Text>
  </View>
);

function InfoScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.cardContainerStyle}
        horizontal
        pagingEnabled
      >
        <CardNews
          image={require('./assets/news1.png')}
          title="비타민 C"
          content="면역력 증진과 항산화 기능을 통한 염증 완화"
        />
        <CardNews
          image={require('./assets/news2.png')}
          title="오메가 3"
          content="혈중 중성지질 개선"
        />
        <CardNews
          image={require('./assets/news3.png')}
          title="칼슘"
          content="신경 및 근육 기능 유지"
        />
        <CardNews
          image={require('./assets/news4.png')}
          title="비타민 d"
          content="뼈 강화"
        />
        <CardNews
          image={require('./assets/news5.png')}
          title="비타민 e"
          content="면역력 강화"
        />
      </ScrollView>
    </View>
  );
}

// Add the following styles for the new components

const { width } = Dimensions.get('window');

function RecommendationScreen() {
  const handleCategoryPress = (category) => {
    let link = '';
    switch (category) {
      case '비타민 C':
        link = 'https://kr.iherb.com/c/vitamin-c';
        break;
      case '오메가 3':
        link = 'https://kr.iherb.com/c/efa-omega-3-6-9-combinations';
        break;
      case '칼슘':
        link = 'https://kr.iherb.com/c/calcium';
        break;
      case '비타민 d':
        link = 'https://kr.iherb.com/c/vitamin-d';
        break;
      case '비타민 e':
        link = 'https://kr.iherb.com/c/vitamin-e';
        break;
      default:
        break;
    }

    if (link !== '') {
      Linking.openURL(link);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💚추천💚</Text>

      <TouchableOpacity onPress={() => handleCategoryPress('비타민 C')} style={styles.button}>
        <Text style={styles.buttonText}>비타민 C 구매하러 가기</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleCategoryPress('오메가 3')} style={styles.button}>
        <Text style={styles.buttonText}>오메가 3 구매하러 가기</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleCategoryPress('칼슘')} style={styles.button}>
        <Text style={styles.buttonText}>칼슘 구매하러 가기</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleCategoryPress('비타민 d')} style={styles.button}>
        <Text style={styles.buttonText}>비타민 d 구매하러 가기</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleCategoryPress('비타민 e')} style={styles.button}>
        <Text style={styles.buttonText}>비타민 e 구매하러 가기</Text>
      </TouchableOpacity>

    </View>
  );
}

function CalendarScreen() {
  const [checkedDays, setCheckedDays] = useState([]);

  const handleDayPress = (day) => {
    setCheckedDays((prevCheckedDays) => {
      if (prevCheckedDays.includes(day)) {
        return prevCheckedDays.filter((checkedDay) => checkedDay !== day);
      } else {
        return [...prevCheckedDays, day];
      }
    });
  };
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = (year, month) => {
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = new Date(year, month, 1).getDay();

    const calendar = [];
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
      calendar.push(
        <TouchableOpacity key={`weekday-${i}`} style={styles.dayButton}>
          <Text style={styles.dayText}>{weekdays[i]}</Text>
        </TouchableOpacity>
      );
    }

    let dayCounter = 1;
    for (let week = 0; week < 6; week++) {
      const weekRow = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDayIndex) {
          weekRow.push(
            <TouchableOpacity key={`empty-${day}`} style={styles.dayButton}>
              <Text style={styles.dayText}>{''}</Text>
            </TouchableOpacity>
          );
        } else if (dayCounter > totalDays) {
          weekRow.push(
            <TouchableOpacity key={`empty-${day}`} style={styles.dayButton}>
              <Text style={styles.dayText}>{''}</Text>
            </TouchableOpacity>
          );
        } else {
          const isChecked = checkedDays.includes(dayCounter);
          weekRow.push(
            <TouchableOpacity
              key={dayCounter}
              style={[styles.dayButton, isChecked && styles.checkedDay]}
              onPress={() => handleDayPress(dayCounter)}
            >
              <Text style={styles.dayText}>{dayCounter}</Text>
            </TouchableOpacity>
          );
          dayCounter++;
        }
      }
      calendar.push(<View key={`week-${week}`} style={styles.calendarRow}>{weekRow}</View>);
    }

    return calendar;
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        {renderCalendar(currentYear, currentMonth)}
      </View>
    </View>
  );
}

function CommunityScreen() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePostSubmit = () => {
    if (newPost) {
      setPosts(prevPosts => [...prevPosts, newPost]);
      setNewPost('');
      setIsModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>커뮤니티</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonLabel}>글 올리기</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={newPost}
              onChangeText={text => setNewPost(text)}
              placeholder="글을 입력하세요."
            />
            <View style={styles.modalButtonContainer}>
              <Button title="글 올리기" onPress={handlePostSubmit} />
              <Button title="취소" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={posts}
        renderItem={({ item }) => <Text style={styles.postText}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.postContainer}
      />
    </View>
  );
}

export default function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHomeScreen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      {!showHomeScreen && (
        <AnimatedLogo onLogoAnimationComplete={() => setShowHomeScreen(true)} />
      )}
      {showHomeScreen && (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            {activeTab === 'info' && <InfoScreen />}
            {activeTab === 'recommendation' && <RecommendationScreen />}
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'calendar' && <CalendarScreen />}
            {activeTab === 'community' && <CommunityScreen />}
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'info' && styles.activeTab]}
              onPress={() => handleTabPress('info')}
            >
              <Image source={require('./assets/info.png')} style={styles.tabIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'recommendation' && styles.activeTab]}
              onPress={() => handleTabPress('recommendation')}
            >
              <Image source={require('./assets/recommendation.png')} style={styles.tabIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'home' && styles.activeTab]}
              onPress={() => handleTabPress('home')}
            >
              <Image source={require('./assets/home.png')} style={styles.tabIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'calendar' && styles.activeTab]}
              onPress={() => handleTabPress('calendar')}
            >
              <Image source={require('./assets/calendar.png')} style={styles.tabIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'community' && styles.activeTab]}
              onPress={() => handleTabPress('community')}
            >
              <Image source={require('./assets/community.png')} style={styles.tabIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardContainerStyle: {
    alignItems: 'center',
  },
  cardContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardImage: {
    width: '50%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    textAlign: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  tabItem: {
    paddingVertical: 10,
    alignItems: 'center',
    flex: 1,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabIcon: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
  },
  checkedDay: {
    backgroundColor: 'yellow',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 120,
    backgroundColor: '#ffbf00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: -130,
    backgroundColor: '#ffbf00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  addButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c8c0fa',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  postContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '60%',
  },
  
  postText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000000',
    backgroundColor: '#e0e0e0',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});
