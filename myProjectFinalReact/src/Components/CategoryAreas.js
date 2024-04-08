import React from "react";
import '../Css/CategoryAreas.css';

const CategoryAreas = () => {
    return (
        <div className="display-content-container">
            <br />
            <div><br /><br /></div>
            <h1 className="h1titleMain">:קטגוריות ותחומים </h1><br />
            <div className="topCategory"><br />האתר מחולק לפי קטגוריות טיפול כלליות
                <br /> על מנת להבין בדיוק באיזה קטגוריה עליך לחפש עבור טיפול ספציפי יש לעבור כאן על הקטגוריות
                <br /> והמטפלים שלנו יוצגו לפי הקטגוריות הכלליות שלהלן</div>
            <div className="domain-section">
                <div className="allCategory">
                    <div className="domain-section">
                        <h3 className="h3title"> סוגי אבחונים</h3>
                        <br />
                        <ul>
                            <li>אבחון דידקטי </li>
                            <li> אבחון פסיכודידקטי</li>
                            <li>BRC אבחון  </li>
                            <li>  אבחון לקויות למידה</li>
                        </ul>
                    </div>
                    <div className="domain-section">
                        <h3 className="h3title">טיפול שפתי- תקשורתי</h3>
                        <br />

                        <ul>
                            <li>  טיפול הפרעות של הבעה והבנה</li>
                            <li> הפרעות הפוגעות בתהליך רכישת השפה </li>
                            <li>אבחון וטיפול בהפרעות דיבור   </li>
                            <li>   טיפול בשיבושי הגיה למינהם </li>
                            <li>   טיפול בעיות בקצב הדיבור כגון גמגום, דיבור חטוף, דיבור איטי וכו </li>
                            <li>  הגיה נכונה של מילים ודיבור תקין</li>
                        </ul>
                    </div>
                    <div className="domain-section">
                        <h3 className="h3title">טיפול פיזותרפיסטי </h3>
                        <br />
                        <ul>
                            <li>  רכיבה טיפולית</li>
                            <li> שחיה טיפולית</li>
                            <li> ספורט טיפולי</li>
                            <li>  טיפול במוסיקה</li>
                            <li>  טיפול באמצעות תנועה ומחול</li>
                            <li>  טיפול באמצעות דרמה</li>
                            <li>  טיפול באמצעות בביליתרפיה</li>

                        </ul>
                    </div>
                    <div className="domain-section">
                        <h3 className="h3title"> טיפול רגשי</h3>      
                        <ul>
                            <li>טיפול CBT</li>
                            <li>טיפול פסיכולוגי</li>
                            <li>טיפול באומנות</li>
                            <li>טיפול נוירופידבק</li>
                            <li>טיפול בהבעה ויצירה</li>
                            <li>טיפול בעזרת בעלי חיים</li>
                            <li>שיטות טיפול רגשי</li>
                            <li>טיפול פרטני</li>
                            <li>טיפול קבוצתי</li>
                            <li>טיפול רגשי בגיל הרך</li>
                            <li>טיפול רגשי לילדים</li>
                            <li>טיפול רגשי בהתאמה אישית</li>
                            <li>טיפול בחרדה</li>
                            <li>טיפול בדיכאון</li>
                            <li>טיפול בהפרעות אכילה</li>
                            <li>טיפול באוטיזם</li>
                            <li>מכון טיפול רגשי</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryAreas;
