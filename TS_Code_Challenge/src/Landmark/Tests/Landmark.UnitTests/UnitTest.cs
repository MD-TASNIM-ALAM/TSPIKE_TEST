using AutoMapper;
using AutoMapper.Configuration;
using Landmark.API.Controllers;
using Landmark.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;
using static Landmark.API.Data.IDataRepository;

namespace Landmark.UnitTests
{
    public class UnitTest
    {
        private readonly Mock<ILogger<LandmarkController>> _landmarkControllerLogger;
        private readonly Mock<DataContext> _dataContext;
        private readonly Mock<IDataRepository<API.Data.Entities.Landmark>> _landmarkRepo;

        public UnitTest()
        {
            var _options = new DbContextOptionsBuilder<DataContext>().Options;

            _landmarkControllerLogger = new Mock<ILogger<LandmarkController>>();
            _dataContext = new Mock<DataContext>(_options);
            _landmarkRepo = new Mock<IDataRepository<API.Data.Entities.Landmark>>();
        }

        [Fact]
        public async Task PostLandmak_ReturnsSuccessStatus()
        {
            //Arrange

            var landmark = new API.Data.Entities.Landmark()
            {
                LandmarkID = 0,
                UserID = 5,
                UserName = "MD Tasnim Alam",
                Latitude = -27.4678,
                Longitude = 153.0251,
                Remark = "Tasnim@Underwood"
            };

            //Act
            var landController = new LandmarkController(_landmarkControllerLogger.Object, _dataContext.Object, _landmarkRepo.Object);
            var actionResult = await landController.PostLandmark(landmark) as OkObjectResult;

            //Assert
            Assert.Equal((int)System.Net.HttpStatusCode.OK, actionResult.StatusCode);
        }
    }
}
