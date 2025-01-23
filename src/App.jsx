import React from 'react';
import { Routes, Route } from 'react-router-dom';
import levels from './Question';
import CategoryList from './CategoryList';
import QuestionList from './QuestionList';
import QuestionScreen from './QuestionScreen';
import Screen2 from './Screen2';
import Table from './Table';
import Group from './Group';

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Routes>
        {/* Route for categories */}
        <Route path="/" element={<CategoryList categories={levels} />} />

        {/* Route for questions in a category */}
        <Route
          path="/category/:categoryIndex"
          element={<QuestionList levels={levels} />}
        />

        {/* Route for a single question */}
        <Route
          path="/category/0/question/:questionIndex"
          element={<Screen2 levels={levels}/>}
        />
          <Route
          path="/category/1/question/:questionIndex"
          element={<Table levels={levels}/>}
        />
        <Route
          path="/category/2/question/:questionIndex"
          element={<Group levels={levels}/>}
        />
      </Routes>
    </div>
  );
};

export default App;
