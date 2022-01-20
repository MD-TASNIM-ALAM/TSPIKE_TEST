using AutoMapper;
using GoLogicEmailAPI.Enums;
using Landmark.API.Data;
using Landmark.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Landmark.API.Data.IDataRepository;

namespace Landmark.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LandmarkController : ControllerBase
    {
        private readonly ILogger<LandmarkController> _logger;
        private readonly IDataRepository<Data.Entities.Landmark> _landmarkRepo;
        private readonly DataContext _context;

        public LandmarkController(ILogger<LandmarkController> logger, DataContext context, IDataRepository<Data.Entities.Landmark> landmarkRepo)
        {
            _logger = logger;
            _landmarkRepo = landmarkRepo;
            _context = context;
        }

        // GET: api/getLandmarks
        [HttpGet("getLandmarks")]
        public ActionResult<IEnumerable<Data.Entities.Landmark>> GetLandmarks()
        {
              return _context.Landmarks.ToList();
        }

        // POST: api/postLandmark
        [HttpPost("postLandmark")]
        public async Task<IActionResult> PostLandmark([FromBody] Data.Entities.Landmark landmark)
        {
            //var landmark1 = _context.Landmarks.Where( t => t.LandmarkID == 1).FirstOrDefault();
            //if (landmark1 == null)
            //{
            //    return NotFound();
            //}

            //_landmarkRepo.Delete(landmark1);
            //var save = await _landmarkRepo.SaveAsync(landmark1);

            _landmarkRepo.Add(landmark);
            var save = await _landmarkRepo.SaveAsync(landmark);

            if (save != null)
            {
                _logger.LogInformation("Remark saved successfully.");
                return Ok(new { Status = Status.Success, Msg = "Remark saved successfully." });
            }
            else
            {
                _logger.LogInformation("Failed");
                return Ok(new { Status = Status.Failed, Msg = "Failed" });
            }
        }
    }
}
