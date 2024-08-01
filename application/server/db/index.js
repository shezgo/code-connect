const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./config.js")

//Import models here
const UserModel = require('./models/user'); 
console.log("UserModel:", UserModel);

const MessageModel = require('./models/message'); 
UserModel.hasMany(MessageModel, { foreignKey: 'userID' });
MessageModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("MessageModel:", MessageModel);

const InboxModel = require('./models/inbox'); 
UserModel.hasOne(InboxModel, { foreignKey: 'userID' });
InboxModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("InboxModel:", InboxModel);

const MessageThreadModel = require('./models/messageThread'); 
MessageModel.hasOne(MessageThreadModel, { foreignKey: 'messageID' });
MessageThreadModel.belongsTo(MessageModel, { foreignKey: 'messageID' });
console.log("MessageThreadModel:", MessageThreadModel);

const ProfileModel = require('./models/profile'); 
UserModel.hasOne(ProfileModel, { foreignKey: 'userID' });
ProfileModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("ProfileModel:", ProfileModel);

const ExternalLinksModel = require('./models/externalLinks'); 
ProfileModel.hasOne(ExternalLinksModel, { foreignKey: 'profileID' });
ExternalLinksModel.belongsTo(ProfileModel, { foreignKey: 'profileID' });
console.log("ExternalLinksModel:", ExternalLinksModel);

const PortfolioModel = require('./models/portfolio'); 
UserModel.hasOne(PortfolioModel, { foreignKey: 'userID' });
PortfolioModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("PortfolioModel:", PortfolioModel);

const ProjectModel = require('./models/project'); 
PortfolioModel.hasMany(ProjectModel, { foreignKey: 'portfolioID' });
ProjectModel.belongsTo(PortfolioModel, { foreignKey: 'portfolioID' });
console.log("ProjectModel:", ProjectModel);

const PostModel = require('./models/post'); 
UserModel.hasMany(PostModel, { foreignKey: 'userID' });
PostModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("PostModel:", PostModel);

const ForumThreadModel = require('./models/forumThread'); 
ForumThreadModel.hasMany(PostModel, { foreignKey: 'threadID' });
PostModel.belongsTo(ForumThreadModel, { foreignKey: 'threadID' });
console.log("ForumThreadModel:", ForumThreadModel);

const ForumModel = require('./models/forum'); 
ForumModel.hasMany(ForumThreadModel, { foreignKey: 'forumID' });
ForumThreadModel.belongsTo(ForumModel, { foreignKey: 'forumID' });
console.log("ForumModel:", ForumModel);

const UserChallengeModel = require('./models/userChallenge'); 
console.log("UserChallengeModel:", UserChallengeModel);

const CodeChallengeModel = require('./models/codeChallenge'); 
UserModel.belongsToMany(CodeChallengeModel, { through:UserChallengeModel,foreignKey: 'userID' });
CodeChallengeModel.belongsToMany(UserModel, { through:UserChallengeModel,foreignKey: 'challengeID' });
console.log("CodeChallengeModel:", CodeChallengeModel);

const UserNotificationModel = require('./models/userNotification'); 
console.log("UserNotificationModel:", UserNotificationModel);

const NotificationModel = require('./models/notification'); 
UserModel.belongsToMany(NotificationModel, { through:UserNotificationModel,foreignKey: 'userID' });
NotificationModel.belongsToMany(UserModel, { through:UserNotificationModel,foreignKey: 'notificationID' });
console.log("notificationModel:", NotificationModel);

const RanksModel = require('./models/ranks'); 
console.log("RanksModel:", RanksModel);

const RankModel = require('./models/rank'); 
RanksModel.hasMany(RankModel, { foreignKey: 'ranksID' });
RankModel.belongsTo(RanksModel, { foreignKey: 'ranksID' });

RankModel.hasMany(UserModel, { foreignKey: 'rankID' });
UserModel.belongsTo(RankModel, { foreignKey: 'rankID' });
console.log("RankModel:", RankModel);

const JobListModel = require('./models/jobList'); 
UserModel.hasMany(JobListModel, { foreignKey: 'userID' });
JobListModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("JobListModel:", JobListModel);

const TrophyModel = require('./models/trophy'); 
UserModel.hasMany(TrophyModel, { foreignKey: 'userID' });
TrophyModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("TrophyModel:", TrophyModel);

const SpecificTrophyModel = require('./models/specificTrophy'); 
TrophyModel.hasMany(SpecificTrophyModel, { foreignKey: 'trophyID' ,sourceKey:"trophyID"});
SpecificTrophyModel.belongsTo(TrophyModel, { foreignKey: 'trophyID',targetKey:"trophyID" });
console.log("SpecificTrophyModel:", SpecificTrophyModel);

const UserPaymentModel = require('./models/userPayment.js');
console.log("UserPaymentModel:", UserPaymentModel);

const PaymentInfoModel = require('./models/paymentInfo'); 
UserModel.belongsToMany(PaymentInfoModel, { through:UserPaymentModel,foreignKey: 'userID' });
PaymentInfoModel.belongsToMany(UserModel, { through:UserPaymentModel,foreignKey: 'paymentID'});
console.log("PaymentInfoModel:", PaymentInfoModel);

const PremiumUserModel = require('./models/premiumUser'); 
UserModel.hasOne(PremiumUserModel, { foreignKey: 'userID' ,sourceKey:"userID"});
PremiumUserModel.belongsTo(UserModel, { foreignKey: 'userID',targetKey:"userID" });
console.log("PremiumUserModel:", PremiumUserModel);

const UserHiringModel = require('./models/userHiring'); 
UserModel.hasOne(UserHiringModel, { foreignKey: 'userID' ,sourceKey:"userID"});
UserHiringModel.belongsTo(UserModel, { foreignKey: 'userID',targetKey:"userID" });
console.log("userHiringModel:", UserHiringModel);

const MentorUserModel = require('./models/mentorUser'); 
PremiumUserModel.hasOne(MentorUserModel, { foreignKey: 'userID' ,sourceKey:"userID"});
MentorUserModel.belongsTo(PremiumUserModel, { foreignKey: 'userID',targetKey:"userID" });
console.log("MentorUserModel:", MentorUserModel);

const FeedbackModel = require('./models/feedback'); 
MentorUserModel.hasMany(FeedbackModel, { foreignKey: 'userID' });
FeedbackModel.belongsTo(MentorUserModel, { foreignKey: 'userID' });
console.log("FeedbackModel:", FeedbackModel);

const UserGroupModel = require('./models/userGroup.js');
console.log("UserPaymentModel:", UserGroupModel);

const GroupModel = require('./models/group.js'); 
UserModel.belongsToMany(GroupModel, { through:UserGroupModel,foreignKey: 'userID' });
GroupModel.belongsToMany(UserModel, { through:UserGroupModel,foreignKey: 'groupID'});
console.log("GroupModel:", GroupModel);

const UserMentorGroupModel = require('./models/userMentorGroup.js');
console.log("UserMentorGroupModel:", UserMentorGroupModel);

const MentorGroupModel = require('./models/mentorGroup.js'); 
GroupModel.hasOne(MentorGroupModel, { foreignKey: 'groupID' ,sourceKey:"groupID"});//extend
MentorGroupModel.belongsTo(GroupModel, { foreignKey: 'groupID',targetKey:"groupID"});//group

MentorUserModel.belongsToMany(MentorGroupModel, { through:UserMentorGroupModel,foreignKey: 'userID' });
MentorGroupModel.belongsToMany(MentorUserModel, { through:UserMentorGroupModel,foreignKey: 'groupID'});
console.log("MentorGroupModel:", MentorGroupModel);

const GroupsModel = require('./models/groups.js');
GroupsModel.hasMany(GroupModel, { foreignKey: 'groupsID' });
GroupModel.belongsTo(GroupsModel, { foreignKey: 'groupsID' });

GroupsModel.hasMany(MentorGroupModel, { foreignKey: 'groupsID' });
MentorGroupModel.belongsTo(GroupsModel, { foreignKey: 'groupsID' });
console.log("GroupsModel:", GroupsModel);

const ChatbotModel = require('./models/chatbot.js'); 
UserHiringModel.hasOne(ChatbotModel, { foreignKey: 'userID'});
ChatbotModel.belongsTo(UserHiringModel, { foreignKey: 'userID'});
console.log("ChatbotModel:", ChatbotModel);

const ChallengeSubModel = require('./models/challengeSub.js'); 
UserModel.hasMany(ChallengeSubModel, { foreignKey: 'userID'});
ChallengeSubModel.belongsTo(UserModel, { foreignKey: 'userID'});

CodeChallengeModel.hasMany(ChallengeSubModel, { foreignKey: 'challengeID'});
ChallengeSubModel.belongsTo(CodeChallengeModel, { foreignKey: 'challengeID'});
console.log("ChallengeSubModel:", ChallengeSubModel);

const ChatSessionModel = require('./models/chatSession.js'); 
UserModel.hasMany(ChatSessionModel, { foreignKey: 'userID'});
ChatSessionModel.belongsTo(UserModel, { foreignKey: 'userID'});
console.log("ChatSessionModel:", ChatSessionModel);

const UserChatSessionModel = require('./models/userChatSession.js');
UserModel.belongsToMany(ChatSessionModel, { through:UserChatSessionModel,foreignKey: 'userID' });
ChatSessionModel.belongsToMany(UserModel, { through:UserChatSessionModel,foreignKey: 'chatSessionID'});
console.log("UserChatSessionModel:", UserChatSessionModel);


const LeaderboardModel = require('./models/leaderboard.js'); 
UserModel.hasMany(LeaderboardModel, { foreignKey: 'userID'});
LeaderboardModel.belongsTo(UserModel, { foreignKey: 'userID'});
console.log("LeaderboardModel:", LeaderboardModel);

/*const SubmissionShareModel = require('./models/submissionShare.js'); 

UserModel.hasMany(SubmissionShareModel, { foreignKey: 'userID' });
SubmissionShareModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("SubmissionShareModel:", SubmissionShareModel);

const SupportFormModel = require('./models/supportForm.js'); 

UserModel.hasMany(SupportFormModel, { foreignKey: 'from_userID' });
SupportFormModel.belongsTo(UserModel, { foreignKey: 'from_userID' });

UserHiringModel.hasMany(SupportFormModel, { foreignKey: 'to_userID' });
SupportFormModel.belongsTo(UserHiringModel, { foreignKey: 'to_userID' });

console.log("SupportFormModel:", SupportFormModel);


const AllEntities = require('./models/allEntities.js'); 
console.log("AllEntitiesModel:", AllEntities);*/


const UserForumModel = require('./models/userForum.js');
UserModel.belongsToMany(ForumModel, { through:UserForumModel,foreignKey: 'userID' });
ForumModel.belongsToMany(UserModel, { through:UserForumModel,foreignKey: 'forumID'});
console.log("UserForumModel:", UserForumModel);

const ThreadModel = require('./models/thread.js'); 
ForumModel.hasMany(ThreadModel, { foreignKey: 'forumID' });
ThreadModel.belongsTo(ForumModel, { foreignKey: 'forumID' });
console.log("ThreadModel:", ThreadModel);

const ReplyModel = require('./models/reply.js'); 
ThreadModel.hasMany(ReplyModel, { foreignKey: 'threadID' });
ReplyModel.belongsTo(ThreadModel, { foreignKey: 'threadID' });
console.log("ReplyModel:", ReplyModel);

const db = {};

const initialize = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      //Define your models here
        db.User = await new UserModel(sequelize, DataTypes);
        
        db.Message = await new MessageModel(sequelize, DataTypes);

        db.Inbox = await new InboxModel(sequelize, DataTypes);

        db.MessageThread = await new MessageThreadModel(sequelize, DataTypes);

        db.Profile = await new ProfileModel(sequelize, DataTypes);

        db.ExternalLinks = await new ExternalLinksModel(sequelize, DataTypes);

        db.Portfolio = await new PortfolioModel(sequelize, DataTypes);

        db.Project = await new ProjectModel(sequelize, DataTypes);
        
        db.Post = await new PostModel(sequelize, DataTypes);

        db.ForumThread = await new ForumThreadModel(sequelize, DataTypes);
        
        db.ForumModel = await new ForumModel(sequelize, DataTypes);

        db.UserChallenge = await new UserChallengeModel(sequelize, DataTypes);

        db.CodeChallenge = await new CodeChallengeModel(sequelize, DataTypes);

        db.UserNotification = await new UserNotificationModel(sequelize, DataTypes);

        db.Notification = await new NotificationModel(sequelize, DataTypes);

        db.Ranks = await new RanksModel(sequelize, DataTypes);

        db.Rank = await new RankModel(sequelize, DataTypes);

        db.JobList = await new JobListModel(sequelize, DataTypes);

        db.Trophy = await new TrophyModel(sequelize, DataTypes);

        db.SpecificTrophy= await new SpecificTrophyModel(sequelize, DataTypes);

        db.UserPayment = await new UserPaymentModel(sequelize, DataTypes);

        db.PaymentInfo = await new PaymentInfoModel(sequelize, DataTypes);

        db.PremiumUser = await new PremiumUserModel(sequelize, DataTypes);

        db.UserHiring = await new UserHiringModel(sequelize, DataTypes);

        db.MentorUser = await new MentorUserModel(sequelize, DataTypes);

        db.Feedback = await new FeedbackModel(sequelize, DataTypes);
        
        db.UserGroup= await new UserGroupModel(sequelize, DataTypes);
        
        db.Group= await new GroupModel(sequelize, DataTypes);

        db.UserMentorGroup= await new UserMentorGroupModel(sequelize, DataTypes);

        db.MentorGroup= await new MentorGroupModel(sequelize, DataTypes);

        db.Groups= await new GroupsModel(sequelize, DataTypes);

        db.Chatbot= await new ChatbotModel(sequelize, DataTypes);

        db.ChallengeSub = await new ChallengeSubModel(sequelize, DataTypes);

        db.ChatSession = await new ChatSessionModel(sequelize, DataTypes);

        db.UserChatSession = await new UserChatSessionModel(sequelize, DataTypes);

        db.leaderboard = await new LeaderboardModel(sequelize, DataTypes);


       /* db.SubmissionShare = await new SubmissionShareModel(sequelize, DataTypes);

        db.SupportForm = await new SupportFormModel(sequelize, DataTypes);
        
        db.AllEntities = await new AllEntities(sequelize, DataTypes);*/
   
        db.UserForum = await new UserForumModel(sequelize, DataTypes);

        db.Thread = await new ThreadModel(sequelize, DataTypes);

        db.Reply = await new ReplyModel(sequelize, DataTypes);

        const modelCount = Object.keys(db).length;
        console.log(`Number of models added: ${modelCount}`);
      //Add any additional models here as needed
      // IE db.AnotherModel = require('./anothermodel')(sequelize, DataTypes);

      return { sequelize, db };
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return {};
    }
  };
module.exports = { initialize, sequelize, db };
