<fieldset>
            <div>
                  <h3 className="optionals">{op.optionType}</h3>
                  <input
                    type="checkbox"
                    name="optionType"
                    ref={cafeRef}
                    required
                    autoFocus
                    className="form-control"
                    proptype="varchar"
                    placeholder="Option name"
                    defaultValue={op.id}
                    onChange={handleControlledInputChange}
                  ></input> </>
            </div><br />
          </fieldset>

          addOrder({
            orderType: onePlan.planName,
            length: onePlan.length,
            price: onePlan.price,
            donate: onePlan.donate,
            option: option.optionType,
            dateTime: Date.now(),
            userId: parseInt(localStorage.getItem('dognasium_user')),
            ... cafeRef.current.value && { cafeOption: true },
          })