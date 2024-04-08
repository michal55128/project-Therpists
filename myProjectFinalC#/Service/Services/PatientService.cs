using AutoMapper;
using Common.EntityDtos;
using Repository.Entity;
using Repository.Interface;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class PatientService : IServicesExtention<PatientDto>
    {
       
            private readonly IRepository<Patient> repository;
            private readonly IMapper mapper;
            public PatientService(IRepository<Patient> repository, IMapper mapper)
            {
                this.repository = repository;
                this.mapper = mapper;
            }

            public async Task<PatientDto> Add(PatientDto item)
            {
                return mapper.Map<PatientDto>(await repository.Add(mapper.Map<Patient>(item)));

            }

            public async Task Delete(int id)
            {
                await this.repository.Delete(id);
            }

            public async Task<List<PatientDto>> GetAll()
            {
                return mapper.Map<List<PatientDto>>(await this.repository.GetAll());
            }

            public async Task<PatientDto> GetById(int id)
            {
                return mapper.Map<PatientDto>(await this.repository.GetById(id));
            }

            public async Task<PatientDto> GetUserPassword(string password)
            {
                try
                {
                    var lst = await this.repository.GetAll();
                    foreach (var item in lst)
                    {
                        if (item.Password == password)
                        {
                            return mapper.Map<PatientDto>(item);
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception();
                }
                return null;
            }


            public async Task<PatientDto> Update(int id, PatientDto item)
            {
                return mapper.Map<PatientDto>(await this.repository.Update(id, mapper.Map<Patient>(item)));
            }

        }
    }
